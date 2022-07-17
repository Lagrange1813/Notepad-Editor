/// <reference types="./types" />
export declare abstract class Constants {
    static readonly ZWSP: string;
    static readonly DROP_EDITOR: string;
    static readonly MOBILE_WIDTH: number;
    static readonly CLASS_MENU_DISABLED: string;
    static readonly EDIT_TOOLBARS: string[];
    static readonly CODE_THEME: string[];
    static readonly CODE_LANGUAGES: string[];
    static readonly MARKDOWN_OPTIONS: {
        autoSpace: boolean;
        codeBlockPreview: boolean;
        fixTermTypo: boolean;
        footnotes: boolean;
        linkBase: string;
        linkPrefix: string;
        listStyle: boolean;
        mark: boolean;
        mathBlockPreview: boolean;
        paragraphBeginningSpace: boolean;
        sanitize: boolean;
        toc: boolean;
    };
    static readonly HLJS_OPTIONS: {
        enable: boolean;
        lineNumber: boolean;
        style: string;
    };
    static readonly MATH_OPTIONS: LGMath;
    static readonly THEME_OPTIONS: {
        current: string;
        list: {
            "ant-design": string;
            dark: string;
            light: string;
            wechat: string;
        };
    };
}
