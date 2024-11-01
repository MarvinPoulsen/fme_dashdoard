import os  # Importerer os-modulet, som tillader interaktion med operativsystemet

def check_error_in_files(directory):
    # Går igennem hver fil i den angivne mappe
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)  # Kombinerer mappenavn og filnavn til fuld sti
        if os.path.isfile(filepath):  # Tjekker, om stien er en fil (og ikke en mappe)
            with open(filepath, 'r') as file:  # Åbner filen i læsetilstand
                lines = file.readlines()  # Læser alle linjer i filen
                if lines and 'ERROR' in lines[-1]:  # Tjekker om der er linjer og om sidste linje indeholder 'ERROR'
                    print(f"Filnavn: {filename}, Linje: {lines[-1]}")  # Printer filnavnet og den sidste linje

# Brug funktionen ved at angive mappenavn:
mappe_sti = r"\\lkgis01\spatialsuite\fme_jobs_log"
check_error_in_files(mappe_sti)  # Kalder funktionen med stien til din mappe
