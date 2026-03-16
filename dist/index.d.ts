import * as React from 'react';
import React__default, { JSX } from 'react';
import { SwiperRef } from 'swiper/react';

declare const LIGHT_MODE = "light";
declare const DARK_MODE = "dark";
type PaletteMode = typeof LIGHT_MODE | typeof DARK_MODE;
declare const useThemeMode: () => PaletteMode;

/**
 * Get the union type of the values of an object type
 * @example
 * const COLORS = { Miku: '#33ccba', Ichika: '#33aaee' } as const
 * type Color = ValueOf<typeof COLORS> // '#33ccba' | '#33aaee'
 */
type ValueOf<T> = T[keyof T];
/**
 * Get the element type of an array type
 * @example
 * type Languages = ['ja', 'en'] as const
 * type Validlanguage = ArrayElement<typeof Languages> // 'ja' | 'en'
 */
type ArrayElement<T extends readonly unknown[]> = T[number];
/**
 * Make all properties in T optional, and if a property is an object, make its properties optional recursively
 * @example
 * interface User { id: string; profile: { name: string; age: number } }
 * type PartialUser = DeepPartial<User>
 * // Result: { id?: string; profile?: { name?: string; age?: number } }
 */
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
/**
 * Make all properties in T required, and if a property is an object, make its properties required recursively
 * @example
 * interface User { id?: string; profile?: { name?: string; age?: number } }
 * type RequiredUser = DeepRequired<User>
 * // Result: { id: string; profile: { name: string; age: number } }
 */
type DeepRequired<T> = {
    [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};
/**
 * Make properties K in T optional
 * @example
 * interface User { id: string; name: string; age: number }
 * type PartialAgeUser = PartialBy<User, 'age'>
 * // Result: { id: string; name: string; age?: number }
 */
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
/**
 * Make properties K in T required
 * @example
 * interface User { id?: string; name?: string; age?: number }
 * type RequiredIdNameUser = RequiredBy<User, 'id' | 'name>
 * // Result: { id: string; name: string; age?: number }
 */
type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/**
 * Sekai colors keys
 * @example 'Miku'
 */
declare const COLORS_SEKAI_KEYS: {
    readonly Miku: "Miku";
    readonly Rin: "Rin";
    readonly Len: "Len";
    readonly Luka: "Luka";
    readonly Meiko: "Meiko";
    readonly Kaito: "Kaito";
    readonly Ichika: "Ichika";
    readonly Saki: "Saki";
    readonly Honami: "Honami";
    readonly Shiho: "Shiho";
    readonly Minori: "Minori";
    readonly Haruka: "Haruka";
    readonly Airi: "Airi";
    readonly Shizuku: "Shizuku";
    readonly Kohane: "Kohane";
    readonly An: "An";
    readonly Akito: "Akito";
    readonly Toya: "Toya";
    readonly Tsukasa: "Tsukasa";
    readonly Emu: "Emu";
    readonly Nene: "Nene";
    readonly Rui: "Rui";
    readonly Kanade: "Kanade";
    readonly Mafuyu: "Mafuyu";
    readonly Ena: "Ena";
    readonly Mizuki: "Mizuki";
    readonly Virtualsinger: "Virtualsinger";
    readonly Leoneed: "Leoneed";
    readonly Moremorejump: "Moremorejump";
    readonly Vividbadsquad: "Vividbadsquad";
    readonly Wonderlandsshowtime: "Wonderlandsshowtime";
    readonly Nightcode: "Nightcode";
};
/**
 * Type of sekai colors keys
 * @example 'Miku'
 */
type ColorsSekaiKey = keyof typeof COLORS_SEKAI_KEYS;
/**
 * List of sekai colors keys
 * @example ['Miku', 'Rin', 'Len', ...]
 */
declare const colorSekaiKeyList: ColorsSekaiKey[];
/**
 * Sekai colors
 * @example { Miku: '#33ccba', Rin: '#ffcc10', ... }
 */
declare const colorsSekai: {
    /** Character */
    readonly Miku: "#33ccba";
    readonly Rin: "#ffcc10";
    readonly Len: "#feee10";
    readonly Luka: "#ffbbcc";
    readonly Meiko: "#dd4544";
    readonly Kaito: "#3367cc";
    readonly Ichika: "#33aaee";
    readonly Saki: "#ffc800";
    readonly Honami: "#ee6666";
    readonly Shiho: "#bbdd22";
    readonly Minori: "#ffc096";
    readonly Haruka: "#99ccff";
    readonly Airi: "#ffaacc";
    readonly Shizuku: "#6be6cd";
    readonly Kohane: "#ff6699";
    readonly An: "#00bbdd";
    readonly Akito: "#ff7722";
    readonly Toya: "#0077dd";
    readonly Tsukasa: "#ffbb00";
    readonly Emu: "#ff66bb";
    readonly Nene: "#33dd99";
    readonly Rui: "#bb88ee";
    readonly Kanade: "#bb6688";
    readonly Mafuyu: "#8888cc";
    readonly Ena: "#ccaa88";
    readonly Mizuki: "#ddaacc";
    /** Unit */
    readonly Virtualsinger: "#f5f5f7";
    readonly Leoneed: "#4455dd";
    readonly Moremorejump: "#88dd44";
    readonly Vividbadsquad: "#ee1166";
    readonly Wonderlandsshowtime: "#ff9900";
    readonly Nightcode: "#884499";
};
/**
 * Type of sekai colors
 * @example { Miku: '#33ccba', Rin: '#ffcc10', ... }
 */
type ColorsSekai = typeof colorsSekai;
/**
 * Type of sekai colors values
 * @example '#33ccba'
 */
type ColorsSekaiCode = ValueOf<typeof colorsSekai>;

interface AccordionProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 要約 - Summary */
    summary: string;
    /** 要約のクラス名 - Summary class name */
    summaryClassName?: string;
    /**
     * デフォルトの開閉状態 - Default open state
     * @default false
     */
    defaultOpen?: boolean;
    /** 詳細 - Details */
    details: string | string[] | React__default.ReactNode;
}

declare const Accordion: ({ sekai, themeMode, summary, summaryClassName, defaultOpen, details, ...rest }: AccordionProps) => React__default.JSX.Element;

interface BackdropProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Backdropの開閉状態 - Open state of the Backdrop */
    open: boolean;
    /** 子要素 - Children */
    children: React__default.ReactNode;
    /**
     * Backdropのポータルコンテナ - Portal container for the Backdrop
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /**
     * コンテンツの中央寄せ - Center content
     * @default true
     */
    centered?: boolean;
}

declare const Backdrop: ({ sekai, themeMode, open, children, containerComponent, centered, ...rest }: BackdropProps) => React__default.ReactPortal | null;

interface BreadcrumbProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 子要素 - Children */
    children: React__default.ReactNode;
    /**
     * 区切りのバリエーション - Separator variant
     * @default 'slash'
     */
    separator?: 'slash' | 'arrow' | 'chevron' | 'dot' | 'pipe';
}

declare const Breadcrumb: ({ sekai, themeMode, children, separator, ...rest }: BreadcrumbProps) => React__default.JSX.Element;

interface BasicButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /**
     * ボタン表示テキストもセカイカラーにするかどうか - Whether to apply Sekai color to the button text
     * @default false
     */
    withTextSekaiColor?: boolean;
    /** ボタン要素への参照 - Ref for the button element */
    ref?: React__default.Ref<HTMLButtonElement>;
    /** ボタンの子要素 - Children elements of the button */
    children?: React__default.ReactNode;
    /**
     * ボタンの無効化するかどうか - Whether to disable the button
     * @default false
     */
    disabled?: boolean;
    /** ボタンクリック時のハンドラー - Click event handler for the button */
    onClick?: () => void;
}

declare const BasicButton: ({ sekai, themeMode, withTextSekaiColor, children, disabled, ...rest }: BasicButtonProps) => React__default.JSX.Element;

interface HamburgerButtonProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ボタン要素への参照 - Ref for the button element */
    ref?: React__default.Ref<HTMLButtonElement>;
    /** ハンバーガーメニューの開閉状態 - Open state of the hamburger menu */
    open: boolean;
    /** ボタンクリック時のハンドラー - Click event handler for the button */
    onClick?: () => void;
}

declare const HamburgerButton: ({ sekai, themeMode, open, ...rest }: HamburgerButtonProps) => React__default.JSX.Element;

interface ScrollTopButtonProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /**
     * ボタンの配置場所 - Position of the button
     * @default 'bottom-right'
     */
    pos?: 'bottom-right' | 'bottom-left';
}

declare const ScrollTopButton: ({ sekai, themeMode, pos, ...rest }: ScrollTopButtonProps) => React__default.ReactPortal | null;

interface StrongButtonProps extends React__default.ButtonHTMLAttributes<HTMLButtonElement> {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ボタン要素への参照 - Ref for the button element */
    ref?: React__default.Ref<HTMLButtonElement>;
    /** ボタンの子要素 - Children elements of the button */
    children?: React__default.ReactNode;
    /**
     * ボタンの無効化するかどうか - Whether to disable the button
     * @default false
     */
    disabled?: boolean;
    /** ボタンクリック時のハンドラー - Click event handler for the button */
    onClick?: () => void;
}

declare const StrongButton: ({ sekai, themeMode, children, disabled, ...rest }: StrongButtonProps) => React__default.JSX.Element;

interface StylishButtonProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ボタン要素への参照 - Ref for the button element */
    ref?: React__default.Ref<HTMLButtonElement>;
    /** ボタンの子要素 - Children elements of the button */
    children?: React__default.ReactNode;
    /**
     * ボタンの無効化するかどうか - Whether to disable the button
     * @default false
     */
    disabled?: boolean;
    /** ボタンクリック時のハンドラー - Click event handler for the button */
    onClick?: () => void;
    /**
     * 矢印アイコンの表示 - Whether to display the arrow icon
     * @default true
     */
    arrowIcon?: boolean;
}

declare const StylishButton: ({ sekai, themeMode, children, disabled, arrowIcon, ...rest }: StylishButtonProps) => React__default.JSX.Element;

interface CardProps extends React__default.HTMLAttributes<HTMLDivElement> {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** カード要素への参照 - Ref for the card element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** カードの子要素 - Children elements of the card */
    children: React__default.ReactNode;
}
interface CardContentProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** カードコンテンツの子要素 - Children elements of the card content */
    children: React__default.ReactNode;
}
interface CardTitleProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** カードタイトルのテキスト - Text for the card title */
    title: string;
    /**
     * タイトルのアンダーライン装飾の有無 - Whether to display an underline for the title
     * @default true
     */
    underline?: boolean;
}

declare const Card: ({ id, className, style, sekai, themeMode, ref, children, ...divProps }: CardProps) => React__default.JSX.Element;
declare const CardContent: ({ id, className, style, themeMode, children, }: CardContentProps) => React__default.JSX.Element;
declare const CardTitle: ({ sekai, themeMode, title, underline, ...rest }: CardTitleProps) => React__default.JSX.Element;

interface MusicBannerCardProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 楽曲タイトル - Music title */
    musicTitle: string;
    /** アーティスト名 - Artist name */
    artist: string;
    /**
     * 選択状態 - Whether the card is selected
     * @default false
     */
    selected?: boolean;
    /** 選択状態変更時のハンドラー - Handler for when the selection state changes */
    onSelect?: (select: boolean) => void;
    /** カードクリック時のハンドラー - Handler for when the card is clicked */
    onClick?: () => void;
    /** カードがフォーカスを失ったときのハンドラー - Handler for when the card loses focus */
    onBlur?: () => void;
    /** カードからマウスが離れたときのハンドラー - Handler for when the mouse leaves the card */
    onMouseLeave?: () => void;
    /**
     * カードのバリアント - Variant of the card
     * @default 'default'
     */
    variants?: 'default' | 'view-all';
}

declare const MusicBannerCard: ({ sekai, themeMode, musicTitle, artist, selected, onSelect, onClick, onBlur, onMouseLeave, variants, ...rest }: MusicBannerCardProps) => React__default.JSX.Element;

interface PrskLinkCardProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /**
     * カードの高さ - Height of the card
     * @default 72
     */
    height?: number;
    /**
     * カードの幅 - Width of the card
     * @default 160
     */
    width?: number;
    /** カードクリック時のハンドラー - Click event handler for the card */
    onClick?: () => void;
    /** カードのタイトル - Title of the card */
    title: string;
    /** カードのサブテキスト - Subtext of the card */
    subText: string;
    /** カード内配置のアイコン - Icon inside the card (can be a URL string or a React node) */
    icon: string | React__default.ReactNode;
}

declare const PrskLinkCard: ({ sekai, themeMode, height, width, onClick, title, subText, icon, ...rest }: PrskLinkCardProps) => React__default.JSX.Element;

interface CarouselProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** カルーセル要素への参照 - Ref for the carousel element */
    ref?: React__default.Ref<SwiperRef>;
    /** カルーセルの子要素 - Children elements of the carousel */
    children: React__default.ReactNode;
    /**
     * カルーセルのサイズ - Size of the carousel
     * @default 'normal'
     */
    size?: 'wide' | 'normal' | 'single';
    /**
     * 自動再生のOff/On - Whether to enable autoplay
     * @default true
     */
    autoPlay?: boolean;
    /**
     * ループ再生のOff/On - Whether to enable infinite loop
     * @default false
     */
    loopInfinite?: boolean;
    /**
     * ページネーションのOff/On - Whether to show pagination
     * @default false
     */
    pagination?: boolean;
}

type CarouselSize = 'wide' | 'normal' | 'single';
declare const Carousel: ({ sekai, themeMode, children, size, autoPlay, loopInfinite, pagination, ...rest }: CarouselProps) => React__default.JSX.Element;

interface DialogButton {
    /** ボタンのテキスト - Text on the button */
    text: string;
    /** ボタンのクリックハンドラー - Click handler for the button */
    onClick: () => void;
    /**
     * ボタンのタイプ - Type of the button (normal or strong)
     * @default 'normal'
     */
    type?: 'normal' | 'strong';
    /** ボタンの無効化するかどうか - Whether to disable the button */
    disabled?: boolean;
    /** アクセシビリティ用のラベル - ARIA label for accessibility */
    ariaLabel?: string;
    /** ボタンのクラス名 - Custom class name for the button */
    buttonClassName?: string;
}
interface DialogProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ダイアログ要素への参照 - Reference to the dialog element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** ダイアログの開閉状態 - Open state of the dialog */
    open: boolean;
    /** ダイアログの内容 - Content of the dialog */
    children: React__default.ReactNode;
    /**
     * ダイアログのポータルコンテナ - Portal container for the dialog
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /**
     * ダイアログのサイズ - Size of the dialog
     * @default 'medium'
     */
    size?: 'narrow' | 'medium' | 'wide';
    /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
    onClose: () => void;
    /** ダイアログのタイトル - Title of the dialog */
    title?: string;
    /**
     * 閉じるアイコンを表示するか - Whether to show the close icon
     * @default false
     */
    showCloseIcon?: boolean;
    /**
     * ダイアログのフッターボタン - Footer buttons for the dialog
     * @see {@link DialogButton}
     */
    buttons?: DialogButton[];
    /** ダイアログのフッターボタン（カスタム） - Custom footer buttons for the dialog */
    dialogButtons?: React__default.ReactNode;
}

declare const Dialog: ({ sekai, themeMode, open, children, containerComponent, size, onClose, title, showCloseIcon, buttons, dialogButtons, ...rest }: DialogProps) => React__default.ReactPortal | null;
type DialogTitleHeaderProps = Pick<DialogProps, 'sekai' | 'themeMode' | 'size' | 'onClose' | 'title' | 'showCloseIcon'> & {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
};
declare const DialogTitleHeader: ({ sekai, themeMode, size, onClose, title, showCloseIcon, ...rest }: DialogTitleHeaderProps) => React__default.JSX.Element | null;
type DialogButtonsProps = Pick<DialogProps, 'sekai' | 'themeMode' | 'buttons'> & {
    id?: string;
    className?: string;
    style?: React__default.CSSProperties;
};
declare const DialogButtons: ({ sekai, themeMode, buttons, ...rest }: DialogButtonsProps) => React__default.JSX.Element | null;

interface WindowDialogProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ダイアログの開閉状態 - Open state of the dialog */
    open: boolean;
    /** ダイアログの内容 - Content of the dialog */
    children: React__default.ReactNode;
    /**
     * WindowDialogのポータルコンテナ - Portal container for the WindowDialog
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /**
     * ダイアログのサイズ - Size of the dialog
     * @default 'medium'
     */
    size?: 'narrow' | 'medium' | 'wide';
    /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
    onClose: () => void;
}

declare const WindowDialog: ({ sekai, themeMode, open, children, containerComponent, size, onClose, ...rest }: WindowDialogProps) => React__default.ReactPortal | null;

interface XoMikuDialogProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ダイアログ要素への参照 - Reference to the dialog element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** ダイアログの開閉状態 - Open state of the dialog */
    open: boolean;
    /** ダイアログの内容 - Content of the dialog */
    children: React__default.ReactNode;
    /**
     * ダイアログのサイズ - Size of the dialog
     * @default 'medium'
     */
    size?: 'narrow' | 'medium' | 'wide';
    /**
     * XoMikuDialogのポータルコンテナ - Portal container for the XoMikuDialog
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
    onClose: () => void;
    /** ダイアログのタイトル - Title of the dialog */
    title?: string;
    /**
     * ダイアログのボタン - Buttons for the dialog
     * @see {@link DialogButton}
     */
    buttons?: DialogButton[];
}

declare const XoMikuDialog: ({ open, themeMode, children, size, containerComponent, onClose, title, buttons, ...rest }: XoMikuDialogProps) => React__default.ReactPortal | null;

interface XxMikuDialogProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ダイアログ要素への参照 - Reference to the dialog element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** ダイアログの開閉状態 - Open state of the dialog */
    open: boolean;
    /** ダイアログの内容 - Content of the dialog */
    children: React__default.ReactNode;
    /**
     * ダイアログのサイズ - Size of the dialog
     * @default 'medium'
     */
    size?: 'narrow' | 'medium' | 'wide';
    /**
     * XxMikuDialogのポータルコンテナ - Portal container for the XxMikuDialog
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /** ダイアログを閉じるためのハンドラー - Handler to close the dialog */
    onClose: () => void;
    /** ダイアログのタイトル - Title of the dialog */
    title?: string;
    /**
     * ダイアログのボタン - Buttons for the dialog
     * @see {@link DialogButton}
     */
    buttons?: DialogButton[];
}

declare const XxMikuDialog: ({ open, themeMode, children, size, containerComponent, onClose, title, buttons, ...rest }: XxMikuDialogProps) => React__default.ReactPortal | null;

interface DividerProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Dividerの子要素 - Children of the divider */
    children?: React__default.ReactNode;
    /** ペアのセカイカラー - Pair Sekai Color */
    pairSekaiColor?: ColorsSekaiKey;
    /** Dividerの線の太さ - Thickness of the divider line */
    lineHeight?: number | string;
    /**
     * Dividerのバリアント - Variant of the divider
     * @default 'fullWidth'
     */
    variant?: 'fullWidth' | 'inset' | 'middle';
    /**
     * Divider内のテキストの位置 - Text alignment within the divider
     * @default 'center'
     */
    textAlign?: 'left' | 'center' | 'right';
    /** Dividerに影をつけるか - Whether to apply shadow to the divider */
    shadow?: boolean;
}

declare const Divider: ({ sekai, themeMode, children, pairSekaiColor, lineHeight, variant, textAlign, shadow, ...rest }: DividerProps) => React__default.JSX.Element;

interface DrawerProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Drawer要素への参照 - Reference to the Drawer element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** Drawerの開閉状態 - Open state of the drawer */
    open: boolean;
    /** Drawerを閉じるためのハンドラー - Handler to close the drawer */
    onClose: () => void;
    /** Drawerの子要素 - Children of the drawer */
    children: React__default.ReactNode;
    /**
     * Drawerのポータルコンテナ - Portal container for the drawer
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /**
     * Drawerの表示位置 - Position of the drawer
     * @default 'right'
     */
    pos?: 'top' | 'right' | 'bottom' | 'left';
}

declare const Drawer: ({ sekai, themeMode, open, onClose, children, containerComponent, pos, ref, ...rest }: DrawerProps) => React__default.ReactPortal | null;

interface DropdownProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /**
     * ドロップダウンのオプションのラベル - Label for the dropdown option
     * @see {@link DropdownOption}
     */
    options: DropdownOption[];
    /** ドロップダウンのデフォルト値 - Default value for the dropdown */
    defaultValue?: string;
    /** ドロップダウンの選択したときのハンドラー - Handler for when an option is selected */
    onSelect: (value: string) => void;
    /** ドロップダウンのプレースホルダー - Placeholder for the dropdown */
    placeholder?: string;
}
interface DropdownOption {
    label: string;
    value: string;
}

declare const Dropdown: (props: DropdownProps) => React__default.JSX.Element;
declare const DropdownContent: ({ sekai, themeMode, options, onSelect, placeholder, ...rest }: DropdownProps) => React__default.JSX.Element;

interface DoReMeetEffectProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * エフェクトで使用するセカイカラーの配列 - Array of Sekai Colors to be used in the effect
     * @see {@link ColorsSekaiKey}
     */
    sekaiKeys: ColorsSekaiKey[];
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 表示テキスト - Display text */
    text: string;
    /** エフェクトの持続時間 - Duration of the effect */
    duration?: number;
}

declare const DoReMeetEffect: ({ sekaiKeys, themeMode, text, duration, ...rest }: DoReMeetEffectProps) => React__default.JSX.Element;

interface IntoTheSekaiProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /** エフェクト終了時に発火するイベント - Event triggered when the effect ends */
    execEvent?: () => void;
    /**
     * エフェクトのポータルコンテナ - Portal container to display the effect
     * @default document.body
     */
    containerComponent?: HTMLElement;
}

declare const IntoTheSekai: ({ execEvent, containerComponent, ...rest }: IntoTheSekaiProps) => React__default.ReactPortal | null;

interface SekaiBackgroundProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイバックグラウンドのポータルコンテナ - Portal container for the Sekai background
     * @default document.body
     */
    containerComponent?: HTMLElement;
    /** エフェクトの透明度 - Opacity of the effect */
    bgOpacity?: number;
}

declare const SekaiBackground: ({ containerComponent, bgOpacity, ...rest }: SekaiBackgroundProps) => React__default.ReactPortal | null;

interface TextLinkProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** テキストリンク要素への参照 - Ref to the text link element */
    ref?: React__default.Ref<HTMLAnchorElement>;
    /** 表示テキスト - Display text */
    text: string;
    /** リンク先URL - Destination URL */
    href: string;
    /**
     * 外部リンクかどうか - Whether it's an external link
     * @default true
     */
    isExternal?: boolean;
    /**
     * リンクの無効か状態 - Whether the link is disabled
     * @default false
     */
    disabled?: boolean;
    /** アクセシビリティ用のラベル - Aria label for accessibility */
    ariaLabel?: string;
}

declare const TextLink: ({ sekai, themeMode, text, href, isExternal, disabled, ariaLabel, ...rest }: TextLinkProps) => React__default.JSX.Element;

interface ListProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** リスト要素への参照 - Ref for the list element */
    ref?: React__default.Ref<HTMLUListElement | HTMLOListElement>;
    /** リストの子要素 - Children elements of the list */
    children: React__default.ReactNode;
    /**
     * リストの種類 - Type of the list
     * @default 'ul'
     */
    as?: 'ul' | 'ol';
    /**
     * 箇条書きの点を表示するか - Whether to display bullet points
     * @default true
     */
    noBullet?: boolean;
}

declare const ListContext: React__default.Context<boolean>;

declare const List: ({ sekai, themeMode, children, as, noBullet, ...rest }: ListProps) => React__default.JSX.Element;

interface ListItemButtonProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** ボタン要素への参照 - Ref for the button element */
    ref?: React__default.Ref<HTMLButtonElement>;
    /** ボタンの子要素 - Children elements of the button */
    children: React__default.ReactNode;
    /** 表示アイコン - Icon to be displayed */
    icon?: string | React__default.ReactNode;
    /**
     * ボタンの無効化するかどうか - Whether to disable the button
     * @default false
     */
    disabled?: boolean;
    /** ボタンクリック時のイベントハンドラー - Click event handler for the button */
    onClick?: () => void;
}

declare const ListItemButton: ({ id, className, style, sekai, themeMode, children, icon, disabled, onClick, ref, }: ListItemButtonProps) => React__default.JSX.Element;

interface ListItemTextProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** テキスト要素への参照 - Ref for the text element */
    ref?: React__default.Ref<HTMLLIElement>;
    /** テキストの内容 - Text content */
    children: React__default.ReactNode;
    /**
     * リストアイテムの種類 - Type of the list item text
     * @default 'p'
     */
    as?: 'span' | 'p';
    /** 表示アイコン - Icon to be displayed */
    icon?: string | React__default.ReactNode;
}

declare const ListItemText: ({ sekai, themeMode, children, as, icon, ...rest }: ListItemTextProps) => React__default.JSX.Element;

interface StickyNoteProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** StickyNoteの内容 - Content of the sticky note */
    children: React__default.ReactNode;
    /**
     * StickyNoteの要素タイプ - Element type of the sticky note
     * @default 'button'
     */
    as?: 'button' | 'text';
    /** ボタンの無効化するかどうか - Whether to disable the button */
    disabled?: boolean;
    /** StickyNoteがクリックされたときのイベントハンドラー - Event handler for when the sticky note is clicked */
    onClick?: () => void;
}

declare const StickyNote: ({ sekai, children, as, ...rest }: StickyNoteProps) => React__default.JSX.Element;

interface LoadingProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
}

declare const Loading: ({ id, className, style, sekai }: LoadingProps) => React__default.JSX.Element;

interface PaginationProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 総ページ数 - Total number of pages */
    totalPages: number;
    /** 現在のページ - Current page */
    page?: number;
    /** ページ変更時のコールバック - Callback when the page changes */
    onChangePage?: (page: number) => void;
    /**
     * 隣接するページの数 - Number of sibling pages
     * @default 1
     */
    siblingCount?: number;
    /**
     * ページネーションのサイズ - Pagination size
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
}

declare const Pagination: ({ sekai, themeMode, totalPages, page, onChangePage, siblingCount, size, ...rest }: PaginationProps) => React__default.JSX.Element;

interface SharedValueProviderProps<T> {
    /** Providerの子要素 - Children elements of the provider */
    children: React__default.ReactNode;
    /** session storageのキー - Key for session storage */
    sessionStorageKey: string;
    /** デフォルト値 - Default value */
    defaultValue: T;
}
interface SharedValueContextProps<T> {
    /** 共有する値 - Shared value */
    sharedValue: T;
    /** 共有する値を更新する関数 - Function to update the shared value */
    setSharedValue: React__default.Dispatch<React__default.SetStateAction<T>>;
    /** 共有する値を削除する関数 - Function to delete the shared value */
    deleteSharedValue: () => void;
}

declare const createSharedValueProvider: <T>() => {
    useSharedValueContext: () => SharedValueContextProps<T>;
    SharedValueProvider: ({ children, sessionStorageKey, defaultValue, }: SharedValueProviderProps<T>) => React__default.JSX.Element;
};

type SekaiThemeProps = {
    palette: {
        sekai: ColorsSekaiKey;
        mode?: PaletteMode;
    };
    typography?: {
        fontFamily?: string;
    };
};
type SekaiTheme = {
    palette: {
        sekai: ColorsSekaiKey;
        mode: PaletteMode;
    };
    typography: {
        fontFamily: string;
    };
};
declare const createSekai: (option: SekaiThemeProps) => SekaiTheme;

interface YourSekaiProviderProps {
    /** Providerの子要素 - Children elements of the provider */
    children: React__default.ReactNode;
    /**
     * セカイテーマ - Sekai theme
     * @see {@link SekaiTheme}
     * @remark YourSekaiProviderはsekaiThemeを必須とし、YourSekaiContextを通じて子コンポーネントに提供します。sekaiThemeはセカイカラーとテーマモードの両方を含む必要があります。
     */
    sekaiTheme: SekaiTheme;
    /** YourSekaiProviderのオプション - Options for YourSekaiProvider */
    options?: YourSekaiOptions;
}
interface YourSekaiOptions {
    /**
     * セカイカラーを保存するかどうか - Whether to store the Sekai color
     * @default false
     * @remark trueに設定すると、ストレージに保存されず、描画ごとに初期値にリセットされます
     */
    disableStoreSekai?: boolean;
    /**
     * テーマモードを保存するかどうか - Whether to store the theme mode
     * @default false
     * @remark trueに設定すると、ストレージに保存されず、描画ごとに初期値にリセットされます
     */
    disableStoreTheme?: boolean;
}
interface YourSekaiContextProps {
    /**
     * セカイテーマ - Sekai theme
     * @see {@link SekaiTheme}
     * @remark YourSekaiProviderはsekaiThemeを必須とし、YourSekaiContextを通じて子コンポーネントに提供します。sekaiThemeはセカイカラーとテーマモードの両方を含む必要があります。
     */
    sekaiTheme: SekaiTheme;
    /**
     * セカイカラーを変更する関数 - Function to change Sekai color
     * @see {@link ColorsSekaiKey}
     * @remark YourSekaiProviderで提供するカラーを変更する関数です
     */
    switchSekaiColor?: (sekai: ColorsSekaiKey) => void;
    /**
     * テーマモードを変更する関数 - Function to change theme mode
     * @see {@link PaletteMode}
     * @remark YourSekaiProviderで提供するテーマモードを変更する関数です
     */
    switchColorTheme?: (color: PaletteMode) => void;
}

declare const YOUR_SEKAI_COLOR = "your_sekai_color";
declare const YOUR_COLOR_THEME = "your_color_theme";
declare const YourSekaiContext: React__default.Context<YourSekaiContextProps | null>;
declare const YourSekaiProvider: ({ children, sekaiTheme, options, }: YourSekaiProviderProps) => React__default.JSX.Element;

interface CheckboxProps extends Omit<React__default.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'checked' | 'disabled'> {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Checkbox要素への参照 - Reference for the Checkbox element */
    ref?: React__default.Ref<HTMLInputElement>;
    /** チェック状態 - Checked state */
    checked?: boolean;
    /** Checkboxを無効化するかどうか - Whether to disable the Checkbox */
    disabled?: boolean;
    /** チェック状態の変更ハンドラー - Handler for changing the checked state */
    onChange?: (checked: boolean) => void;
    /**
     * Checkboxのスタイル - Style for the Checkbox
     * @remark fillingがtrueの場合、チェックボックスが塗りつぶされます
     */
    filling?: boolean;
}

declare const Checkbox: ({ sekai, themeMode, checked, disabled, onChange, filling, ...rest }: CheckboxProps) => React__default.JSX.Element;

interface ChipProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** チップの内容 - Content of the Chip */
    label: string;
    /** チップがクリックされたときのハンドラー - Click event handler for the Chip */
    onClick?: () => void;
    /** チップの削除アイコンがクリックされたときのハンドラー - Click event handler for the delete icon of the Chip */
    onDelete?: () => void;
    /**
     * チップのサイズ - Size of the Chip
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * チップのバリアント - Variant of the Chip
     * @default 'filled'
     */
    variant?: 'filled' | 'outlined';
}

declare const Chip: ({ sekai, themeMode, label, onClick, onDelete, size, variant, ...rest }: ChipProps) => React__default.JSX.Element;

interface SideMenuProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** サイドメニューの開閉状態 - Open state of the side menu */
    open?: boolean;
    /** サイドメニューのハンバーガーボタンのクリックハンドラー - Click handler for the side menu hamburger button */
    onClick?: () => void;
    /** サイドメニューのコンテンツ - Content of the side menu */
    children?: React__default.ReactNode;
    /**
     * サイドメニューの表示位置 - Position of the side menu
     * @default 'left'
     */
    pos?: 'left' | 'right';
    /**
     * SideMenuのポータルコンテナ - Portal container for the SideMenu
     * @default document.body
     */
    containerComponent?: HTMLElement;
}

declare const SideMenu: ({ sekai, themeMode, open, onClick, children, pos, containerComponent, ...rest }: SideMenuProps) => React__default.ReactPortal | null;

interface MarqueeTextProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** テキスト要素への参照 - Reference to the text element */
    ref?: React__default.Ref<HTMLDivElement>;
    /** テキストの内容 - Content of the text */
    children: React__default.ReactNode;
    /** アニメーションの継続時間 - Duration of the animation in milliseconds */
    duration?: number;
    /** 親要素の背景色 - Background color of the parent element */
    parentBackgroundColor?: string;
}

declare const MarqueeText: ({ sekai, themeMode, children, duration, parentBackgroundColor, ref, ...rest }: MarqueeTextProps) => JSX.Element;

interface NamePlateProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 表示するテキスト - Text to display */
    text: string;
    /**
     * カラーリングするテキスト文字数 - Number of characters to color
     * @default 1
     */
    colorLength?: number;
}

declare const NamePlate: ({ sekai, themeMode, text, colorLength, ...rest }: NamePlateProps) => React__default.JSX.Element;

interface OutlineTextProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 表示するテキスト - Text to display */
    text: string;
}

declare const OutlineText: ({ sekai, themeMode, text, ...rest }: OutlineTextProps) => React__default.JSX.Element;

interface TypewriterTextProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 表示するテキスト - Text to display */
    text: string;
    /** タイプライターのオプション - Options for the typewriter effect */
    options?: TypewriterTextOptions;
}
interface TypewriterTextOptions {
    /**
     * タイプライターエフェクトの速度（ミリ秒） - Speed of the typewriter effect in milliseconds
     * @default 100
     */
    speed?: number;
    /**
     * ループするかどうか - Whether to loop the typewriter effect
     * @default false
     */
    loop?: boolean;
    /**
     * タイプ時にカーソルを表示するかどうか - Whether to show a cursor while typing
     * @default true
     */
    showCursor?: boolean;
}

declare const TypewriterText: ({ sekai, themeMode, text, options, ...rest }: TypewriterTextProps) => React__default.JSX.Element;

interface BaseUtilTextProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 本文テキストの内容 - Content of the body text */
    children?: React__default.ReactNode;
}
interface BaseSekaiUtilTextProps extends BaseUtilTextProps {
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
}
interface BodyTextProps extends BaseUtilTextProps {
}
interface SekaiBodyTextProps extends BaseSekaiUtilTextProps {
}
interface DetailTextProps extends BaseUtilTextProps {
}
interface SekaiDetailTextProps extends BaseSekaiUtilTextProps {
}
interface AnnotationTextProps extends BaseUtilTextProps {
}
interface SekaiAnnotationTextProps extends BaseSekaiUtilTextProps {
}

declare const BodyText: ({ themeMode, children, ...rest }: BodyTextProps) => React__default.JSX.Element;
declare const SekaiBodyText: ({ sekai, children, ...rest }: SekaiBodyTextProps) => React__default.JSX.Element;
declare const DetailText: ({ themeMode, children, ...rest }: DetailTextProps) => React__default.JSX.Element;
declare const SekaiDetailText: ({ sekai, children, ...rest }: SekaiDetailTextProps) => React__default.JSX.Element;
declare const AnnotationText: ({ themeMode, children, ...rest }: AnnotationTextProps) => React__default.JSX.Element;
declare const SekaiAnnotationText: ({ sekai, children, ...rest }: SekaiAnnotationTextProps) => React__default.JSX.Element;

interface TextAreaProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** テキストエリアの値 - Value of the text area */
    value?: string;
    /** テキストエリアの値が変更されたときのハンドラー - Handler for when the value of the text area changes */
    onChange?: (value: string) => void;
    /** プレースホルダー - Placeholder text */
    placeholder?: string;
    /**
     * テキストエリアを無効化するかどうか - Whether to disable the text area
     * @default false
     */
    disabled?: boolean;
    /** 入力可能な最大文字数 - Maximum number of characters allowed */
    maxLength?: number;
    /**
     * テキストエリアのリサイズスタイル - Resize style for the text area
     * @default 'none'
     */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}

declare const TextArea: ({ sekai, themeMode, value, onChange, placeholder, disabled, maxLength, resize, ...rest }: TextAreaProps) => React__default.JSX.Element;

interface TextFieldProps extends React__default.InputHTMLAttributes<HTMLInputElement> {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** テキストフィールドのプレースホルダー - Placeholder text for the text field */
    placeholder?: string;
    /**
     * テキストクリアボタンの表示有無 - Whether to display the clear button
     * @default true
     */
    showClearButton?: boolean;
    /** 入力値変更時のコールバック - Callback function when the input value changes */
    onChangeInput?: (value: string) => void;
    /**
     * エラーステートの有無 - Whether the text field is in an error state
     * @default false
     */
    isError?: boolean;
    /** エラーメッセージ - Error message */
    errorMessage?: string;
    /** 最大入力文字数 - Maximum input length */
    maxLength?: number;
}

declare const TextField: ({ id, className, style, sekai, themeMode, showClearButton, onChangeInput, isError, errorMessage, ...inputProps }: TextFieldProps) => React__default.JSX.Element;

interface ToastProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Toastの開閉状態 - Open state of the toast */
    open: boolean;
    /** Toastを閉じるためのハンドラー - Handler to close the toast */
    onClose: () => void;
    /**
     * Toastの表示位置 - Position of the toast
     * @default 'bottom'
     */
    pos?: 'top' | 'bottom';
    /** Toastに表示するメッセージ - Message to display in the toast */
    message: string | string[];
    /**
     * エラートーストかどうか - Whether it's an error toast
     * @default false
     */
    isError?: boolean;
    /**
     * トーストが自動的に閉じるまでの時間（ミリ秒） - Time in milliseconds before the toast automatically closes
     * @default 3000
     */
    duration?: number;
    /**
     * Toastのポータルコンテナ - Portal container for the toast
     * @default document.body
     */
    containerComponent?: HTMLElement;
}

declare const Toast: ({ sekai, themeMode, open, onClose, pos, message, isError, duration, containerComponent, ...rest }: ToastProps) => React__default.ReactPortal | null;

interface TooltipProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** Tooltipの子要素 - Children of the tooltip */
    children: React__default.ReactNode;
    /** Tooltipに表示するテキスト - Text to display in the tooltip */
    text: string;
    /**
     * Tooltipの表示位置 - Position of the tooltip
     * @default 'top'
     */
    pos?: 'top' | 'bottom';
}

declare const Tooltip: ({ sekai, themeMode, children, text, pos, ...rest }: TooltipProps) => React__default.JSX.Element;

interface PictureViewerProps {
    /** ユニークID - Unique identifier */
    id?: string;
    /** クラス名 - Class name */
    className?: string;
    /** スタイル - Inline styles */
    style?: React__default.CSSProperties;
    /**
     * セカイカラー - Sekai Color
     * @see {@link ColorsSekaiKey}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.sekaiを参照し、contextもない場合はデフォルトのMikuカラーが適用されます。
     */
    sekai?: ColorsSekaiKey;
    /**
     * テーマモード - Theme Mode
     * @see {@link PaletteMode}
     * @remark props指定が無い場合、YourSekaiContextからsekaiTheme.palette.modeを参照し、contextもない場合はデフォルトのlightモードが適用されます。
     */
    themeMode?: PaletteMode;
    /** 画像のソースURL - Image source URL */
    imgSrc: string;
    /**
     * 画像の代替テキスト - Alternative text for the image
     * @default ''
     */
    alt?: string;
    /**
     * サムネイルの幅 - Width of the thumbnail
     * @default 210
     */
    width?: number;
    /**
     * 画像のオブジェクトフィット - Object fit for the image
     * @default 'contain'
     */
    objectFit?: 'contain' | 'cover';
    /**
     * PictureViewerのポータルコンテナ - Portal container for the PictureViewer
     * @default document.body
     */
    containerComponent?: HTMLElement;
}

declare const PictureViewer: ({ sekai, themeMode, imgSrc, alt, width, objectFit, containerComponent, ...rest }: PictureViewerProps) => React__default.JSX.Element | null;

declare const useCreateSekai: () => YourSekaiContextProps;

declare const useCurrentTime: () => Date;

declare const useLocalStorage: <T>(localStorageKey: string, initialValue: T) => {
    storedValue: T;
    setStoredValue: React.Dispatch<React.SetStateAction<T>>;
    deleteLocalStorage: () => void;
};

declare const useSessionStorage: <T>(sessionStorageKey: string, initialValue: T) => {
    storedValue: T;
    setStoredValue: React.Dispatch<React.SetStateAction<T>>;
    deleteSessionStorage: () => void;
};

declare const ORIENTATION: {
    readonly PORTRAIT: "PORTRAIT";
    readonly LANDSCAPE: "LANDSCAPE";
};
type Orientation = (typeof ORIENTATION)[keyof typeof ORIENTATION];
declare const useInnerSize: () => number;
/**
 * @description This hook is used to get the current window size and orientation.
 * Return Portrait if the window size is 768px or less, otherwise return Landscape.
 */
declare const useOrientation: () => Orientation;
/**
 * @description This hook is used to get the current window size and check if it is in tablet size.
 * Return true if the window size is between 768px and 1280px, otherwise return false.
 */
declare const useTabletSize: () => boolean;

/**
 * @description Get localized character name by ColorsSekaiKey
 * @param {string} name - ColorsSekaiKey
 * @param {string} locale - Locale code (default: 'ja')
 * @returns {string} - Localized character name
 */
declare const getSekaiCharacterName: (name: ColorsSekaiKey, locale?: string) => string;

/**
 * @description Convert hex color to rgb color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @returns {string} RGB color string (e.g., rgb(255, 0, 0))
 */
declare const convertHexToRgb: (hex: string) => string;
/**
 * @description Convert hex color to rgba color
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} alpha - Alpha value (0 to 1)
 * @returns {string | undefined} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
declare const convertHexToRgba: (hex: string, alpha?: number) => string;
/**
 * @description Convert hex color to rgba color mixed with black or white
 * @param {string} hex - Hex color string (e.g., #RRGGBB)
 * @param {number} mixRatio - Ratio to mix with black or white (0 to 1)
 * @param {boolean} mixWhite - true to mix with white, false to mix with black
 * @param {number | undefined} alpha - Alpha value (0 to 1), default is 1
 * @returns {string} RGBA color string (e.g., rgba(255, 0, 0, 0.5))
 */
declare const convertHexToRgbaMixWithBlackOrWhite: (hex: string, mixRatio: number, mixWhite: boolean, alpha?: number) => string;

/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Enter key is pressed.
 * @param eventHandler - The function to be called when the Enter key is pressed.
 * @returns A new event handler that calls the provided handler on Enter key press and prevents the default action.
 */
declare const fireOnEnterKey: <T extends HTMLElement>(eventHandler: (e: React__default.KeyboardEvent<T>) => void) => (e: React__default.KeyboardEvent<T>) => void;
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Escape key is pressed.
 * @param eventHandler - The function to be called when the Escape key is pressed.
 * @returns A keyboard event handler function.
 */
declare const fireOnEscapeKey: (eventHandler: (e: KeyboardEvent) => void) => (e: KeyboardEvent) => void;
/**
 * @description Returns a keyboard event handler that triggers the provided event handler only when the Space key is pressed.
 * @param eventHandler - The function to be called when the Space key is pressed.
 * @returns A keyboard event handler function.
 */
declare const fireOnSpaceKey: <T extends HTMLElement>(eventHandler: (e: React__default.KeyboardEvent<T>) => void) => (e: React__default.KeyboardEvent<T>) => void;
/**
 * @description Returns a new array with the elements of the input array shuffled in random order.
 * Uses the Fisher-Yates (Knuth) shuffle algorithm to ensure an unbiased shuffle.
 *
 * @typeParam T - The type of elements in the array.
 * @param array - The array to shuffle.
 * @returns A new array containing the shuffled elements.
 */
declare const shuffleArray: <T>(array: T[]) => T[];

/**
 * @description Utility functions for serializing and deserializing data, including handling of Date objects.
 * @param {T} data - The data to serialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The serialized data
 */
declare const serializeData: <T>(data: T, visited?: WeakSet<WeakKey>) => unknown;
/**
 * @description Deserialize data, converting ISO date strings back to Date objects
 * @param {unknown} data - data to deserialize
 * @param {WeakSet<object>} visited - A WeakSet to track visited objects for circular reference detection
 * @returns {unknown} - The deserialized data
 */
declare const deserializeData: (data: unknown, visited?: WeakSet<WeakKey>) => unknown;
declare const deserializeDataWithTemplate: <T>(obj: unknown, template: T, visited?: WeakSet<WeakKey>) => T;
/**
 * @description Validates if a string is a valid date string (ISO 8601 or other formats recognized by Date.parse)
 * @param dateStr - date string to validate
 * @returns boolean - whether the string is a valid date string
 */
declare const isValidDateString: (dateStr: string) => boolean;

/**
 * Returns the current time as a Date object.
 * @returns {Date} The current Date object.
 */
declare const getCurrentTime: () => Date;
/**
 * Returns the current time as a string in the specified format.
 * @param {Date} now - The current Date object.
 * @param {string} format - Format type ('datetime', 'date', 'time', 'timestamp', 'iso')
 * @param {string} locale - Locale (default: 'ja-JP')
 * @returns {string} Formatted time string
 */
declare const getFormattedTime: (now: Date, format?: string, locale?: string) => string;
/**
 * Returns the current time in a custom format.
 * @param {Date} now - The current Date object.
 * @param {string} pattern - Format pattern (e.g., 'YYYY-MM-DD HH:mm:ss')
 * @returns {string} Formatted time string
 */
declare const getCustomCurrentTime: (now: Date, pattern?: string) => string;

export { Accordion, AnnotationText, Backdrop, BasicButton, BodyText, Breadcrumb, COLORS_SEKAI_KEYS, Card, CardContent, CardTitle, Carousel, Checkbox, Chip, DARK_MODE, DetailText, Dialog, DialogButtons, DialogTitleHeader, Divider, DoReMeetEffect, Drawer, Dropdown, DropdownContent, HamburgerButton, IntoTheSekai, LIGHT_MODE, List, ListContext, ListItemButton, ListItemText, Loading, MarqueeText, MusicBannerCard, NamePlate, ORIENTATION, OutlineText, Pagination, PictureViewer, PrskLinkCard, ScrollTopButton, SekaiAnnotationText, SekaiBackground, SekaiBodyText, SekaiDetailText, SideMenu, StickyNote, StrongButton, StylishButton, TextArea, TextField, TextLink, Toast, Tooltip, TypewriterText, WindowDialog, XoMikuDialog, XxMikuDialog, YOUR_COLOR_THEME, YOUR_SEKAI_COLOR, YourSekaiContext, YourSekaiProvider, colorSekaiKeyList, colorsSekai, convertHexToRgb, convertHexToRgba, convertHexToRgbaMixWithBlackOrWhite, createSekai, createSharedValueProvider, deserializeData, deserializeDataWithTemplate, fireOnEnterKey, fireOnEscapeKey, fireOnSpaceKey, getCurrentTime, getCustomCurrentTime, getFormattedTime, getSekaiCharacterName, isValidDateString, serializeData, shuffleArray, useCreateSekai, useCurrentTime, useInnerSize, useLocalStorage, useOrientation, useSessionStorage, useTabletSize, useThemeMode };
export type { ArrayElement, CarouselSize, ColorsSekai, ColorsSekaiCode, ColorsSekaiKey, DeepPartial, DeepRequired, DialogButtonsProps, DialogTitleHeaderProps, Orientation, PaletteMode, PartialBy, RequiredBy, SekaiTheme, SekaiThemeProps, ValueOf };
