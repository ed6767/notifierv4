import { SerialPort, ReadlineParser } from "serialport";
import { DisplayCommand, DisplayCommandStarter } from "./DisplayCommands";

export default class DisplayDriver {
    // Constructor - list serial ports and open the first one at 500000 baud and 8 data bits
    private port: SerialPort | null = null;
    private parser: ReadlineParser | null = null;

    public async sendCommand(command: DisplayCommand) {
        // Ensure command is a single byte
        if (command > 0xFF) {
            throw new Error("Command must be a single byte");
        }

        // Write the command to the display
        this.port?.write(Buffer.from([DisplayCommandStarter, command]));
    }

    public async connect() {
        const ports = await SerialPort.list();
        const port = ports[0].path;
        this.port = new SerialPort({
            path: port,
            baudRate: 500000,
            dataBits: 8,
        });

        this.sendCommand(DisplayCommand.ClearDisplay);

        // Write some text to the display
        this.port?.write("Hello, world!");
    }
}