import type { DisplayChoices } from "@codrstudio/agentic-sdk";
type ChoiceButtonsProps = DisplayChoices & {
    onChoiceSelect?: (value: string) => void;
};
export declare function ChoiceButtonsRenderer({ question, choices, layout, onChoiceSelect, }: ChoiceButtonsProps): import("react/jsx-runtime").JSX.Element;
export {};
