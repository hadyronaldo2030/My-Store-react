// src/hooks/useSimpleBar.js
import { useEffect } from 'react';

const useSimpleBar = (selector) => {
  useEffect(() => {
    const SimpleBar = window.SimpleBar;

    if (SimpleBar) {
      document.querySelectorAll(selector).forEach((element) => {
        if (!element.SimpleBarInstance) {
          element.SimpleBarInstance = new SimpleBar(element);
        }
      });
    }

    // تنظيف عند إلغاء تحميل المكون
    return () => {
      document.querySelectorAll(selector).forEach((element) => {
        if (element.SimpleBarInstance) {
          element.SimpleBarInstance.unMount();
          element.SimpleBarInstance = null;
        }
      });
    };
  }, [selector]);
};

export default useSimpleBar;
