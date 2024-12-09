from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

def splash(request):
    return render(request, 'splash.html')

def menu(request):
    return render(request, 'menu.html')

def mode(request):
    return render(request, 'mode.html')

def marathon_mode(request):
    return render(request, 'marathon.html')

#def marathon_learn(request):
#    return render(request, 'learn.html')

def about(request):
    return render(request, 'about.html')

# Lista de nombres de archivos PDF para la visualización
PDF_LIST = ["Pirateria_1.pdf", "Pirateria_2.pdf", "Pirateria_3.pdf", "Pirateria_4.pdf"]

def learn_view(request, pdf_index=0):
    # Aseguramos que el índice esté dentro del rango de la lista de PDFs
    pdf_index = max(0, min(pdf_index, len(PDF_LIST) - 1))
    
    # Genera el archivo PDF actual
    current_pdf = PDF_LIST[pdf_index]
    
    # Imprime en la consola de logs para verificar el valor
    print(f"Current PDF: {current_pdf}")

    context = {
        "current_pdf": current_pdf,
        "pdf_index": pdf_index,
        "pdf_count": len(PDF_LIST)
    }
    
    return render(request, "learn.html", context)

def target_view(request):
    player1_name = request.COOKIES.get('player1', 'Jugador 1')
    player2_name = request.COOKIES.get('player2', 'Jugador 2')

    map_selection = request.COOKIES.get('map', 'default_value')
    size_selection = request.COOKIES.get('size', 'default_value')
    difficulty_selection = request.COOKIES.get('difficulty', 'default_value')
    mode_selection = request.COOKIES.get('mode', 'default_value')

    context = {
        'player1': player1_name,
        'player2': player2_name,
        'map': map_selection,
        'size': size_selection,
        'difficulty': difficulty_selection,
        'mode': mode_selection,
    }
    return render(request, 'comodines.html', context)

def tablero(request):
    return render(request, 'tablero.html')