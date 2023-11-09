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

    public async writeToDisplay(textLine1: string, textLine2: string) {

    }

    public async connect() {
        const ports = await SerialPort.list();
        
        // Select where productId is 7523 and vendorId is 1a86 (CH340 serial converter)
        const port = ports.find(p => p.productId === "7523" && p.vendorId === "1a86");

        // If no port was found, throw an error
        if (!port) {
            throw new Error("No display found");
        }

        this.port = new SerialPort({
            path: port.path,
            baudRate: 500000,
            dataBits: 8,
        });

        // Wait two seconds for the display to boot up
        await new Promise(resolve => setTimeout(resolve, 2000));

        this.sendCommand(DisplayCommand.ClearDisplay);

        this.sendCommand(DisplayCommand.NextLine);

        // Write some text to the display
        this.port?.write("i luv eddie <3");
    }
}