import os
import json  # Importerer json-modulet

def check_error_in_files(directory):
    results = []
    for filename in os.listdir(directory):
        filepath = os.path.join(directory, filename)
        if os.path.isfile(filepath):
            with open(filepath, 'r') as file:
                lines = file.readlines()
                status = 'Empty'
                last_susses = None
                last_error = None
                last_empty = None
                
                for line in lines:
                    if 'ERROR' in line:
                        status = 'ERROR'
                        last_error = line.strip().split('; ')[0]
                    elif 'SUCCES' in line:
                        status = 'OK'
                        last_susses = line.strip().split('; ')[0]
                    else:
                        status = 'Empty'
                        last_empty = line.strip()
                
                results.append({
                    'filename': filename,
                    'status': status,
                    'last_susses': last_susses,
                    'last_error': last_error,
                    'last_empty': last_empty
                })
    
    return results

mappe_sti = r"\\lkgis01\spatialsuite\fme_jobs_log"
resultater = check_error_in_files(mappe_sti)

# Konverterer resultaterne til JSON-streng
resultater_json = json.dumps(resultater)

# Udskriver JSON-objektet som streng
print(resultater_json)
