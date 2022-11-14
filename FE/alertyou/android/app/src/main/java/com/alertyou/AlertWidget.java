package com.alertyou;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;
import android.widget.Toast;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Implementation of App Widget functionality.
 */
public class AlertWidget extends AppWidgetProvider {

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        try {
            SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
            String appString = sharedPref.getString("appData", "{\"text\":'no data'}");
            JSONObject appData = new JSONObject(appString);
            RemoteViews views = new RemoteViews(context.getPackageName(), R.layout.alert_widget);
            views.setTextViewText(R.id.appwidget_text, appData.getString("text"));

            // intent onclick
            Intent intent = new Intent(context, context.getClass());
            intent.setAction("report");
            intent.putExtra("text", appData.getString("text"));
            views.setOnClickPendingIntent(R.id.appwidget_button, PendingIntent.getBroadcast(context,0,intent,0));
            appWidgetManager.updateAppWidget(appWidgetId, views);
        } catch (JSONException e) {
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

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        if (intent.getAction().equals("report")) {
            if(intent.getExtras() != null) {
               String complete = intent.getExtras().getString("text");
               Log.d("hoon", complete);
               Toast.makeText(context, complete, Toast.LENGTH_LONG).show();
            }
        }

    }
}