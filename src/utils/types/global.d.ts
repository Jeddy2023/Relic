interface GTranslateSettings {
    default_language: string;
    wrapper_selector: string;
    alt_flags: { [key: string]: string };
}

interface Window {
    gtranslateSettings: GTranslateSettings;
}