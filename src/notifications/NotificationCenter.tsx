import notifee, {Notification, RepeatFrequency, TimestampTrigger, TriggerType} from '@notifee/react-native';
import { Event } from '../values/appDefaults';

const CHANNEL_ID = 'myroutine-channel';
const CHANNEL_NAME = 'My Routines';

export async function NotifyEvent(title: string, body: string) {
  //Channel for Android
  const channelId = await notifee.createChannel({
    id: CHANNEL_ID,
    name: CHANNEL_NAME,
  });

  // Request permissions (required for iOS)
  await notifee.requestPermission();

  const notification = {
    title: title,
    body: body,
    android: {
      channelId,
      smallIcon: 'ic_launcher', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  };

  await notifee.displayNotification(notification);
}

export async function ScheduleNotifications(
  title: string,
  body: string,
  event: Event,
): Promise<string[]> {
  if (!event || !event.id || !event.alertEnabled) {
    return [];
  }

  const notificationIds: string[] = [];

  const channelId = await notifee.createChannel({
    id: CHANNEL_ID,
    name: CHANNEL_NAME,
  });

  const eventId = event.id;

  //Create notifications for the days of the week
  event.indexes.forEach(async (index: number) => {
    const date = new Date();
    date.setDate(date.getDate() + ((index + 7 - date.getDay()) % 7));
    date.setHours(new Date(event.startAt).getHours());
    date.setMinutes(new Date(event.startAt).getMinutes());
    date.setSeconds(0);
    date.setMilliseconds(0);

    if (date.getTime() < new Date().getTime()) {
      date.setDate(date.getDate() + 7);
    }

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
      repeatFrequency: RepeatFrequency.WEEKLY,
    };

    const notification: Notification = {
      id: eventId + index,
      title: title,
      body: body,
      android: {
        channelId: channelId,
      },
    };

    notificationIds.push(eventId + index);
    await notifee.createTriggerNotification(notification, trigger);
  });

  //Return the IDS of the notifications
  return notificationIds;
}
