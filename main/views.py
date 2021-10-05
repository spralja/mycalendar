import datetime

from django.http import HttpResponse, Http404
from django.shortcuts import redirect
from django.template import loader
from datetime import date

from .models import *

DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']


def current(request):
    return redirect('y/current/w/current')


def index(request, year=date.today().year, week=date.today().isocalendar()[1]):
    template = loader.get_template('main/index.html')
    # datetime only supports years between [1,9999]
    if not (datetime.MINYEAR <= year <= datetime.MAXYEAR):
        raise Http404("Year %d not supported" % year)

    if not (week > 0):
        raise Http404("Week has to be positive")
    # Get last week from current year, because the last week can be 52 or 53
    if not (week <= date(year, 12, 31).isocalendar()[1]):
        raise Http404("Week %d does not exist in %d!, the last week in %d is %d" % (week, year, year))

    context = {
        'year': year,
        'week': week,
        'days': DAYS,
        'events': Event.objects.all(),
    }

    return HttpResponse(template.render(context, request))
