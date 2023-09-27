package com.myweekroutine;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import android.widget.TextView;

import java.util.Calendar;
import java.util.Date;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class AppWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"currentIndex\":'0',\"eventsIndexStart\":[],\"eventsIndexEnd\":[],\"eventsNames\":[],\"textNone\":\"No events today\"}");
            JSONObject appData = new JSONObject(appString);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.app_widget);
            views.setTextViewText(R.id.appwidget_text_none, appData.getString("textNone"));
            views.setViewVisibility(R.id.appwidget_text_none, TextView.GONE);

            String event1 = null;
            boolean event1Now = false;
            String event2 = null;
            boolean event2Now = false;

            //Current index will be the current hour * 2 + 1 if it is past the half hour
            int currentIndex = Calendar.getInstance().get(Calendar.HOUR_OF_DAY) * 2 + (Calendar.getInstance().get(Calendar.MINUTE) >= 30 ? 1 : 0);
            for (int i = 0; i < appData.getJSONArray("eventsIndexStart").length(); i++) {
                boolean isEventGoing = currentIndex >= appData.getJSONArray("eventsIndexStart").getInt(i) && currentIndex < appData.getJSONArray("eventsIndexEnd").getInt(i);
                if (appData.getJSONArray("eventsIndexEnd").getInt(i) >= currentIndex) {
                    if (event1 == null) {
                        event1 = appData.getJSONArray("eventsNames").getString(i);
                        if (isEventGoing) {
                            event1Now = true;
                        }
                    } else if (event2 == null) {
                        event2 = appData.getJSONArray("eventsNames").getString(i);
                        if (isEventGoing) {
                            event2Now = true;
                        }
                        break;
                    }
                }
            }

            if (event1 != null) {
                views.setTextViewText(R.id.appwidget_text1, event1);
                views.setInt(R.id.appwidget_text1, "setBackgroundResource", event1Now ? R.drawable.app_widget_inner_view_background_accent : R.drawable.app_widget_inner_view_background_primary);
                views.setViewVisibility(R.id.appwidget_text1, TextView.VISIBLE);
            } else {
                views.setViewVisibility(R.id.appwidget_text1, TextView.GONE);
            }
            if (event2 != null) {
                views.setTextViewText(R.id.appwidget_text2, event2);
                views.setInt(R.id.appwidget_text2, "setBackgroundResource", event2Now ? R.drawable.app_widget_inner_view_background_accent : R.drawable.app_widget_inner_view_background_primary);
                views.setViewVisibility(R.id.appwidget_text2, TextView.VISIBLE);
            } else {
                views.setViewVisibility(R.id.appwidget_text2, TextView.GONE);
            }   
            
            if (event1 == null && event2 == null) {
                views.setViewVisibility(R.id.appwidget_text_none, TextView.VISIBLE);
            } else {
                views.setViewVisibility(R.id.appwidget_text_none, TextView.GONE);
            }

            appWidgetManager.updateAppWidget(appWidgetId, views);
        }catch (JSONException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        try {
            for (int appWidgetId : appWidgetIds) {
                // Set the update interval to 30 minutes (1800000 milliseconds)
                long updateIntervalMillis = 1800000;

                // Create a PendingIntent that triggers the onUpdate method
                Intent intent = new Intent(context, AppWidget.class);
                intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
                intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, new int[]{appWidgetId});
                PendingIntent pendingIntent = PendingIntent.getBroadcast(context, appWidgetId, intent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);

                // Set the update interval using the AlarmManager
                AlarmManager alarmManager = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
                alarmManager.setRepeating(AlarmManager.RTC, System.currentTimeMillis(), updateIntervalMillis, pendingIntent);

                // Update the widget content
                updateAppWidget(context, appWidgetManager, appWidgetId);
            }
        } catch (Exception e) {
            System.out.println("MyWeekRoutine ERROR");
            e.printStackTrace();
        }
    }

    @Override
    public void onEnabled(Context context) {
        // Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
        // Enter relevant functionality for when the last widget is disabled
    }
}