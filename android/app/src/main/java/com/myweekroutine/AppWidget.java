package com.myweekroutine;

import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.SharedPreferences;
import android.widget.RemoteViews;
import android.widget.TextView;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class AppWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"currentIndex\":'0',\"eventsIndex\":[],\"eventsNames\":[],\"textNone\":\"No events\"}");
            JSONObject appData = new JSONObject(appString);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.app_widget);
            views.setTextViewText(R.id.appwidget_text_none, appData.getString("textNone"));
            views.setViewVisibility(R.id.appwidget_text_none, TextView.GONE);

            String event1 = null;
            boolean event1Now = false;
            String event2 = null;
            boolean event2Now = false;
            
            for (int i = 0; i < appData.getJSONArray("eventsIndex").length(); i++) {
                if (appData.getJSONArray("eventsIndex").getInt(i) >= appData.getInt("currentIndex")) {
                    if (event1 == null) {
                        event1 = appData.getJSONArray("eventsNames").getString(i);
                        if (appData.getJSONArray("eventsIndex").getInt(i) == appData.getInt("currentIndex")) {
                            event1Now = true;
                        }
                    } else if (event2 == null) {
                        event2 = appData.getJSONArray("eventsNames").getString(i);
                        if (appData.getJSONArray("eventsIndex").getInt(i) == appData.getInt("currentIndex")) {
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
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
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