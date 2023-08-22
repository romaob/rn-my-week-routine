/*
    Given a routine list, time slots list, and current day index.
    It should build and return the objcets for being rendered on the screen.

    It should follow the following logic:
    - Filter events array, returning only those that are for the current day.
    - Go over every time slot
        - check if there is a routine for that time slot.
            - if there is, check if there is a blockRow for that time slot and select it, if not, create it.
            - add a blockColumn to the blockRow.
                - check if is there empty space before the routine.
                    - if there is, add a emptyRoutineBlocks to the columnBlock until filling the empty space.
                - add a routineBlock to the columnBlock.
                    - Fill the routineBlock with rows representing all time slots that the routine takes.
                - Check if there is empty space after the routine.
                    - if there is, add a emptyRoutineBlocks to the columnBlock until filling the empty space.
                - Remove the routine from the list.
        - Repeats until there are no more routines for the time slot
*/