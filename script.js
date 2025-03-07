let bluetoothDevice;
let characteristic;

async function connectToRobot() {
    try {
        bluetoothDevice = await navigator.bluetooth.requestDevice({
            acceptAllDevices: true,
            optionalServices: ['0000ffe0-0000-1000-8000-00805f9b34fb']
        });

        const server = await bluetoothDevice.gatt.connect();
        const service = await server.getPrimaryService('0000ffe0-0000-1000-8000-00805f9b34fb');
        characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');
        
        alert("Connected to Spider Robot!");
    } catch (error) {
        console.log('Connection failed:', error);
        alert("Failed to connect. Try again!");
    }
}

function sendCommand(command) {
    if (characteristic) {
        const data = new TextEncoder().encode(command);
        characteristic.writeValue(data);
        console.log(`Command sent: ${command}`);
    } else {
        alert("Please connect to the robot first!");
    }
}

document.getElementById('connectButton').addEventListener('click', connectToRobot);
document.getElementById('forwardButton').addEventListener('click', () => sendCommand('FORWARD'));
document.getElementById('backwardButton').addEventListener('click', () => sendCommand('BACKWARD'));
document.getElementById('leftButton').addEventListener('click', () => sendCommand('LEFT'));
document.getElementById('rightButton').addEventListener('click', () => sendCommand('RIGHT'));
document.getElementById('gripOpenButton').addEventListener('click', () => sendCommand('GRIP_OPEN'));
document.getElementById('gripCloseButton').addEventListener('click', () => sendCommand('GRIP_CLOSE'));
document.getElementById('ultrasonicScanButton').addEventListener('click', () => sendCommand('ULTRASONIC_SCAN'));
