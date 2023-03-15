#include <DHT.h>
#include <WiFi.h>
#include <PubSubClient.h>
#include <Wire.h>
#include <AccelStepper.h>

const char* ssid = "AndroidAPF621";
const char* password = "hnop8001";
const char* mqtt_server = "broker.hivemq.com";
#define motorPin1  27
#define motorPin2  16
#define motorPin3  17
#define motorPin4  25
#define MotorInterfaceType 4
#define DHTPIN 5
#define DHTTYPE DHT11
WiFiClient espClient;
AccelStepper stepper = AccelStepper(MotorInterfaceType, motorPin1, motorPin3, motorPin2, motorPin4);
PubSubClient client(espClient);
DHT dht(DHTPIN, DHTTYPE);
long lastMsg = 0;
char msg[50];
int value = 0;


// LED Pin
const int ledPin = 4;
const int ledRed = 14;
const int ledYellow = 26;

void setup() {
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);
  stepper.setMaxSpeed(1000);
  dht.begin();
  pinMode(ledPin, OUTPUT);
  pinMode(ledRed, OUTPUT);
  pinMode(ledYellow, OUTPUT);
}
void loop() {
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 50000) {
    getDhtSensorData();
    lastMsg = now;
  }
}
void setup_wifi() {
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}
void getDhtSensorData() {
  float h;
  float t;
  float f;
  h = dht.readHumidity();
  Serial.println(h);
  t = dht.readTemperature();
  Serial.println(t);
  f = dht.readTemperature(true);
  Serial.println(f);
  if (isnan(h) || isnan(t) || isnan(f)) {
    Serial.println(F("Failed to read from DHT sensor!"));
    return;
  }
  else {
    String temperature = String(t);
    String humidity = String(h);
    String payload = "{";
    payload += "\"temperature\":"; payload += temperature; payload += ",";
    payload += "\"humidity\":"; payload += humidity;
    payload += "}";
    char attributes[100];
    payload.toCharArray( attributes, 100 );
    client.publish("smarthouse/temparature", attributes);
  } 
}
void callback(char* topic, byte* message, unsigned int length) {
  Serial.print("Message arrived on topic: ");
  Serial.print(topic);
  Serial.print(". Message: ");
  String messageTemp;
  for (int i = 0; i < length; i++) {
    Serial.print((char)message[i]);
    messageTemp += (char)message[i];
  }
  Serial.println();

  if (String(topic) == "/smarthouse/stateLed") {
    ledStatus(messageTemp);
  }
  else if (String(topic) == "/smarthouse/stateDoor") {
    doorStatus(messageTemp);
  }
}
void doorStatus(String message) {
  if (message == "true") {
    Serial.println("open door !!");
    stepper.setCurrentPosition(0);
    while (stepper.currentPosition() != 512) {
      stepper.setSpeed(600);
      stepper.runSpeed();
    }
    delay(100);
  }

  else if (message == "false") {
    Serial.println("close door !!");
    stepper.setCurrentPosition(0);
    while (stepper.currentPosition() != -512) {
      stepper.setSpeed(-600);
      stepper.runSpeed();
    }
    delay(100);

  }
}
void ledStatus(String message) {
  Serial.print("Changing output to ");
  if (message == "true/green") {
    Serial.println("on");
    digitalWrite(ledPin, HIGH);
  }
  else if (message == "false/green") {
    Serial.println("off");
    digitalWrite(ledPin, LOW);
  }
  else  if (message == "true/yellow") {
    Serial.println("on");
    digitalWrite(ledYellow, HIGH);
  }
  else if (message == "false/yellow") {
    Serial.println("off");
    digitalWrite(ledYellow, LOW);
  }
  else  if (message == "true/red") {
    Serial.println("on");
    digitalWrite(ledRed, HIGH);
  }
  else if (message == "false/red") {
    Serial.println("off");
    digitalWrite(ledRed, LOW);
  }
}
void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("esp32Client")) {
      Serial.println("connected");
      client.subscribe("/smarthouse/stateLed");
      client.subscribe("/smarthouse/stateDoor");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      delay(5000);
    }
  }
}
