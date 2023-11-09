export const DisplayCommandStarter = 0x60;

export enum DisplayCommand {
    ClearDisplay = 0x63,
    ReadButtons = 0x62,
    PowerOff = 0x70,
    NextLine = 0x32,
}

export enum ButtonState {
    Right = 0,
    Up = 1,
    Down = 2,
    Left = 3,
    Select = 4,
    None = 5,
}