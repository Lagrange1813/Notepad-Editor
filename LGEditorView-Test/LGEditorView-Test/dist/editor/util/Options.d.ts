/// <reference types="./types" />
export declare class Options {
    options: LGOptions;
    private defaultOptions;
    constructor(options: LGOptions);
    merge(): LGOptions;
    private mergeToolbar;
}
