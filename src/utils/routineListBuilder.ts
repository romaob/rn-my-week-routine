import {Event, ITEM_MINUTES, getEmptyEvent} from '../values/appDefaults';
import {getDayTimesForMinutes, getSlotIndexOfDate} from './dateUtils';
import {checkIsActive} from '../components/TimeLabels';

export type EventSlot = {
  event: Event;
  timeSlots: number[];
};

export type TimeSlot = {
  date: Date;
  index: number;
  events: Event[];
  active: boolean;
};

export type ColumnEventSlot = {
  eventSlots: EventSlot[];
};

export type TimeBlock = {
  columns: ColumnEventSlot[];
  eventsIds: string[];
};

type RoutineList = {
  timeBlocks: TimeBlock[];
};

type BlockMatrix = {
  xSize: number;
  ySize: number;
  id?: string[];
  matrix?: string[][];
};

function getSlotId(slot: TimeSlot): string[] {
  //Return an array of the events ids whitin the slot
  return slot.events.map(event => event.id || '');
}

function checkIdsBelongToMatrixId(ids: string[], matrixId: string[]): boolean {
  //Check using some, if any of the ids belong to the matrixId return true
  return (
    (ids.length === 0 && matrixId.length === 0) ||
    ids.some(id => matrixId.includes(id))
  );
}

export default function routineListBuilder(events: Event[]): RoutineList {
  const routineList: RoutineList = {
    timeBlocks: [],
  };
  //Creating the map with the unique time slots, with empty events array
  const timeSlotsMap = new Map<number, TimeSlot>();
  const timeOptions = getDayTimesForMinutes(ITEM_MINUTES) as Date[];
  for (const option of timeOptions) {
    const optionIndex =
      option.getHours() * 2 + (option.getMinutes() >= 30 ? 1 : 0);
    timeSlotsMap.set(optionIndex, {
      date: option,
      index: optionIndex,
      events: [],
      active: checkIsActive(option),
    });
  }

  //Pupulating the map with the events matching the time slots
  const eventProcessedMap = new Map<string, boolean>();
  for (const event of events) {
    eventProcessedMap.set(event.id || '', false);
    const eventStartIndex = getSlotIndexOfDate(
      new Date(event.startAt),
      ITEM_MINUTES,
    );
    const eventEndIndex = getSlotIndexOfDate(
      new Date(event.endAt),
      ITEM_MINUTES,
    );
    for (let i = eventStartIndex; i < eventEndIndex; i++) {
      const slot = timeSlotsMap.get(i);
      if (slot) {
        slot.events.push(event);
      }
    }
  }
  //Process the data creating matrix, going over every time slot
  const generatedMatrixes: BlockMatrix[] = [];
  const timeSlots = Array.from(timeSlotsMap.values());
  let currentMatrix: BlockMatrix = {
    xSize: 0,
    ySize: 0,
    matrix: [],
  };
  for (let slot of timeSlots) {
    const slotRowIds = getSlotId(slot);
    //Check if needs to create a new matrix, and add the current on the list
    if (
      !currentMatrix.id ||
      !checkIdsBelongToMatrixId(slotRowIds, currentMatrix.id)
    ) {
      if (currentMatrix.matrix?.length) {
        generatedMatrixes.push(currentMatrix);
      }
      //Create a new matrix
      currentMatrix = {
        xSize: 0,
        ySize: 0,
        id: [],
        matrix: [],
      };
    }
    //Handling empty
    if (slotRowIds.length === 0) {
      //Check if a column is already created, otherwise create it
      if (currentMatrix.xSize === 0) {
        currentMatrix?.matrix?.push(['']);
        currentMatrix.xSize++;
        currentMatrix.ySize++;
      } else {
        //If it exists Add a new row
        currentMatrix.matrix?.[0].push('');
        currentMatrix.ySize++;
      }
    } else {
      //Go for every id in the slot
      for (let id of slotRowIds) {
        const event = events.find(e => e.id === id);
        if (!event) {
          continue;
        }
        //Continue if this event was already processed
        if (eventProcessedMap.get(id)) {
          continue;
        }
        //Check if the column X dont exists, if not create it
        if (!currentMatrix.matrix?.length) {
          currentMatrix.matrix?.push([]);
          currentMatrix.xSize++;
        }

        //Check if the matrix slot is available, if not create a new column
        let availableMatrixColumn = -1;
        const size = currentMatrix?.matrix?.length || 0;
        for (let i = 0; i < size; i++) {
          const val = currentMatrix?.matrix?.[i]?.[currentMatrix.ySize];
          if (!val) {
            availableMatrixColumn = i;
            break;
          }
        }
        if (availableMatrixColumn < 0) {
          currentMatrix.matrix?.push([]);
          currentMatrix.xSize++;
          availableMatrixColumn = (currentMatrix?.matrix?.length || 1) - 1;
        }

        //Finding how many slots needs to be added
        const eventStartIndex =
          new Date(event.startAt).getHours() * 2 +
          (new Date(event.startAt).getMinutes() >= 30 ? 1 : 0);
        const eventEndIndex =
          new Date(event.endAt).getHours() * 2 +
          (new Date(event.endAt).getMinutes() >= 30 ? 1 : 0);
        const eventSlots = eventEndIndex - eventStartIndex;
        //Adding the event to the matrix
        for (let i = 0; i < eventSlots; i++) {
          const matrixColumn = currentMatrix?.matrix?.[availableMatrixColumn];
          if (matrixColumn) {
            matrixColumn[currentMatrix.ySize + i] = id;
          }
        }
        //Marking the event as processed
        eventProcessedMap.set(id, true);
        //Adding the event id to the matrix ids
        currentMatrix.id?.push(id);
      }
      //Increasing ySize start index
      currentMatrix.ySize++;
    }
  }
  if (currentMatrix.matrix?.length) {
    generatedMatrixes.push(currentMatrix);
  }

  //Reset the processed events map
  for (let key of eventProcessedMap.keys()) {
    eventProcessedMap.set(key, false);
  }

  // Create the routine list
  // Create a block for every matrix
  for (let matrix of generatedMatrixes) {
    const timeBlock: TimeBlock = {
      columns: [],
      eventsIds: matrix.id || [],
    };

    //In every block, create a column for every column in the matrix
    for (let i = 0; i < matrix.xSize; i++) {
      const columnEventSlot: ColumnEventSlot = {
        eventSlots: [],
      };
      //Create the event slot for every row in the column
      for (let j = 0; j < matrix.ySize; j++) {
        const eventId = matrix.matrix?.[i]?.[j];
        //If there is no event on the slot, add an empty event
        if (!eventId) {
          columnEventSlot.eventSlots.push({
            event: getEmptyEvent(),
            timeSlots: [0],
          });
          continue;
        }
        //Continue if this event was already processed
        if (eventProcessedMap.get(eventId)) {
          continue;
        }
        //Find the event in the events list
        const event = events.find(e => e.id === eventId);
        if (!event) {
          continue;
        }
        //Create the event slot with all the time slots
        const eventStartIndex =
          new Date(event.startAt).getHours() * 2 +
          (new Date(event.startAt).getMinutes() >= 30 ? 1 : 0);
        const eventEndIndex =
          new Date(event.endAt).getHours() * 2 +
          (new Date(event.endAt).getMinutes() >= 30 ? 1 : 0);
        const eventSlots = eventEndIndex - eventStartIndex;

        const eventSlot: EventSlot = {
          event: event,
          timeSlots: [],
        };

        for (let k = 0; k < eventSlots; k++) {
          eventSlot.timeSlots.push(eventStartIndex + k);
        }
        //Add the event slot to the column
        columnEventSlot.eventSlots.push(eventSlot);
        //Marking the event as processed
        eventProcessedMap.set(eventId, true);
      }
      timeBlock.columns.push(columnEventSlot);
    }

    routineList.timeBlocks.push(timeBlock);
  }
  return routineList;
}
