import RPi.GPIO as GPIO
from time import sleep

GPIO.setmode(GPIO.BCM) #Art der Nummerierung bestimmen
GPIO.setwarnings(False) #Warnmeldungen ausschalten
GPIO.setup(2, GPIO.OUT) #Output definieren

GPIO.output(2, 1) #Output schalten
