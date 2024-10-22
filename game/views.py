from django.shortcuts import render
from django.http import HttpResponseRedirect

def splash(request):
    return render(request, 'splash.html')

def menu(request):
    return render(request, 'menu.html')

def mode(request):
    return render(request, 'mode.html')

def marathon_mode(request):
    return render(request, 'marathon.html')

def marathon_learn(request):
    return render(request, 'learn.html')
