import json

from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.template import loader
from django.utils import timezone
from datetime import datetime, date, timedelta

from mycalendar.settings import TIME_ZONE
from .models import *
from .week_view import *


def current(request):
    year = datetime.now().year
    week = datetime.now().isocalendar()[1]
    return redirect('y/%d/w/%d' % (year, week))


def get_index_context(year, week):
    qs = Event.objects.filter(
        start_time__gte=datetime.fromisocalendar(year, week, 1),
        start_time__lt=datetime.fromisocalendar(year, week, 7) + timedelta(days=1),
        end_time__gte=datetime.fromisocalendar(year, week, 1),
        end_time__lt=datetime.fromisocalendar(year, week, 7) + timedelta(days=1)
    ).order_by('start_time')

    return qs


def index(request, year=date.today().year, week=date.today().isocalendar()[1]):
    print(timezone.localtime(timezone.now()).year)
    if request.method == 'PUT':
        data = json.loads((request.body.__str__())[2:len(request.body.__str__())-1])
        pk = int(data['pk'])
        day = int(data['new_start_day']) + 1
        hours = int(data['new_start_hour'])
        event = Event.objects.get(pk=pk)
        event.start_time = datetime.fromisocalendar(year=year, week=week, day=day) + timedelta(hours=hours)
        hours = int(data['new_end_hour'])
        event.end_time = datetime.fromisocalendar(year=year, week=week, day=day) + timedelta(hours=hours)
        event.save()

    template = loader.get_template('main/index.html')
    # datetime only supports years between [1,9999]
    # if not (datetime.MINYEAR <= year <= datetime.MAXYEAR):
    #    raise Http404("Year %d not supported" % year)

    if not (week > 0):
        raise Http404("Week has to be positive")
    # Get last week from current year, because the last week can be 52 or 53
    if not (week <= date(year, 12, 31).isocalendar()[1]):
        raise Http404("Week %d does not exist in %d!, the last week in %d is %d" % (week, year, week, year))

    week_view = WeekView(
        year,
        week,
        get_index_context(year, week),
        x=0,
        y=0,
        day_width=150,
        hour_height=35,
    )

    context = {
        'year': year,
        'week': week,
        'divs': week_view.divs,
        'week_view_x': week_view.x,
        'week_view_y': week_view.y,
        'column_width': week_view.day_width,
        'hour_height': week_view.hour_height,
        'events': get_index_context(year, week),
    }

    return HttpResponse(template.render(context, request))
