import React, { createContext, useContext, ReactNode, useMemo, useEffect } from "react";
import { useAppSelector } from "../store/hooks";
import { selectSettings } from "../store/selectors";
import type { LanguageCode } from "../types/app";
import { translations, type TranslationNode, type TranslationMap } from "./translations";
import { setDayjsLocale } from "../utils/date";

type TranslateParams = Record<string, string | number>;

type I18nContextValue = {
  language: LanguageCode;
  t: (key: string, params?: TranslateParams) => string;
  tList: (key: string) => string[];
};

const I18nContext = createContext<I18nContextValue>({
  language: "tr",
  t: (key: string) => key,
  tList: () => [],
});

const isMap = (value: TranslationNode): value is TranslationMap =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const resolvePath = (language: LanguageCode, key: string): TranslationNode | undefined => {
  const dictionary = translations[language];
  if (!dictionary) {
    return undefined;
  }
  const segments = key.split(".");
  let pointer: TranslationNode | undefined = dictionary;
  for (const segment of segments) {
    if (!pointer || !isMap(pointer)) {
      return undefined;
    }
    pointer = pointer[segment];
  }
  return pointer;
};

const formatString = (value: string, params?: TranslateParams) => {
  if (!params) {
    return value;
  }
  return value.replace(/\{(\w+)\}/g, (_, match) => (params[match] !== undefined ? String(params[match]) : ""));
};

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const { language } = useAppSelector(selectSettings);

  useEffect(() => {
    setDayjsLocale(language);
  }, [language]);

  const value = useMemo<I18nContextValue>(() => {
    const translate = (key: string, params?: TranslateParams) => {
      const resolved = resolvePath(language, key);
      if (typeof resolved === "string") {
        return formatString(resolved, params);
      }
      if (Array.isArray(resolved)) {
        return resolved.join("\n");
      }
      return key;
    };

    const translateList = (key: string) => {
      const resolved = resolvePath(language, key);
      return Array.isArray(resolved) ? resolved : [];
    };

    return {
      language,
      t: translate,
      tList: translateList,
    };
  }, [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useTranslation = () => useContext(I18nContext);
