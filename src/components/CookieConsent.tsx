import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Shield, Cookie, X, Check, Settings2, Info } from "lucide-react";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true, // Always true and locked
    analytics: true,
    careCoordination: true,
  });

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const savedConsent = localStorage.getItem("akirapa_cookie_consent_v1");
      if (!savedConsent) {
        // Show after a gentle 1.2 second delay on first load
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access error fallback
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem(
        "akirapa_cookie_consent_v1",
        JSON.stringify({
          accepted: true,
          date: new Date().toISOString(),
          preferences: { essential: true, analytics: true, careCoordination: true },
        })
      );
    } catch {
      // ignore
    }
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem(
        "akirapa_cookie_consent_v1",
        JSON.stringify({
          accepted: true,
          date: new Date().toISOString(),
          preferences,
        })
      );
    } catch {
      // ignore
    }
    setShowPreferences(false);
    setIsVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem(
        "akirapa_cookie_consent_v1",
        JSON.stringify({
          accepted: true,
          date: new Date().toISOString(),
          preferences: { essential: true, analytics: false, careCoordination: false },
        })
      );
    } catch {
      // ignore
    }
    setShowPreferences(false);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent Banner"
      className="fixed bottom-3 left-3 right-3 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-500"
    >
      <div className="bg-white/95 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl p-5 sm:p-6 text-gray-900 ring-1 ring-black/5">
        {!showPreferences ? (
          <div>
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#76248a]/10 text-[#76248a] flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-[#76248a]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base text-gray-900 leading-tight">
                    Privacy, HIPAA & Cookie Notice
                  </h3>
                  <span className="text-[11px] font-semibold text-[#40ddd3] bg-[#76248a] px-2 py-0.5 rounded-full inline-block mt-0.5">
                    Massachusetts Healthcare Compliant
                  </span>
                </div>
              </div>

              <button
                onClick={handleEssentialOnly}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-lg transition-colors"
                aria-label="Close and continue with essential cookies only"
                title="Continue with essential only"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              At Akirapa Home Care, we safeguard your health and personal data in strict compliance with{" "}
              <strong className="text-gray-900">HIPAA</strong> and Massachusetts privacy laws (
              <em>201 CMR 17.00</em>). We use secure cookies to verify EVV shift data, optimize care
              coordination, and deliver trusted services.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-gray-100 text-xs">
              <Link
                to="/privacy"
                className="text-[#76248a] hover:text-[#561868] font-bold underline underline-offset-2 flex items-center gap-1"
              >
                <Info className="w-3.5 h-3.5" />
                Privacy Policy & HIPAA Notice
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/terms"
                className="text-[#76248a] hover:text-[#561868] font-bold underline underline-offset-2"
              >
                Terms of Service
              </Link>
              <span className="text-gray-300">•</span>
              <Link
                to="/consumer-rights"
                className="text-gray-600 hover:text-gray-900 font-semibold"
              >
                Client Rights
              </Link>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-[#40ddd3]" />
                Accept All Cookies
              </button>

              <button
                type="button"
                onClick={() => setShowPreferences(true)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm py-2.5 px-3.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
              >
                <Settings2 className="w-4 h-4 text-gray-500" />
                Customize
              </button>

              <button
                type="button"
                onClick={handleEssentialOnly}
                className="text-gray-500 hover:text-gray-800 font-semibold text-xs py-2 px-2.5 text-center transition-colors"
              >
                Essential Only
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-gray-100 pb-3">
              <div className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-[#76248a]" />
                <h3 className="font-extrabold text-sm sm:text-base text-gray-900">
                  Cookie & Privacy Preferences
                </h3>
              </div>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
                aria-label="Back"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 text-xs">
              {/* Category 1: Strictly Necessary */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-green-600" />
                    Essential & HIPAA Security (Required)
                  </span>
                  <span className="text-[10px] font-bold uppercase bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                    Always Active
                  </span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Required for site security, encrypted session validation, patient data safeguards, and form
                  submission processing. Cannot be disabled.
                </p>
              </div>

              {/* Category 2: Care Coordination & AkiVault */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="carePref"
                    className="font-bold text-gray-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Cookie className="w-3.5 h-3.5 text-[#76248a]" />
                    Care Coordination & AkiVault™ Tokens
                  </label>
                  <input
                    type="checkbox"
                    id="carePref"
                    checked={preferences.careCoordination}
                    onChange={(e) =>
                      setPreferences({ ...preferences, careCoordination: e.target.checked })
                    }
                    className="rounded text-[#76248a] focus:ring-[#40ddd3] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Enables live quote calculator persistence, caregiver recruitment preferences, and family portal
                  session continuity.
                </p>
              </div>

              {/* Category 3: Performance & Analytics */}
              <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="analyticsPref"
                    className="font-bold text-gray-900 flex items-center gap-1.5 cursor-pointer"
                  >
                    <Cookie className="w-3.5 h-3.5 text-[#40ddd3]" />
                    Performance & User Experience Analytics
                  </label>
                  <input
                    type="checkbox"
                    id="analyticsPref"
                    checked={preferences.analytics}
                    onChange={(e) =>
                      setPreferences({ ...preferences, analytics: e.target.checked })
                    }
                    className="rounded text-[#76248a] focus:ring-[#40ddd3] w-4 h-4 cursor-pointer"
                  />
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  Aggregated, de-identified telemetry that helps us optimize page load speeds, layout readability, and
                  service discoverability across Massachusetts communities.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleSavePreferences}
                className="flex-1 bg-[#76248a] hover:bg-[#561868] text-white font-extrabold text-xs py-2 px-3 rounded-xl transition-all shadow-sm"
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className="bg-[#40ddd3] hover:bg-[#34c4ba] text-gray-950 font-extrabold text-xs py-2 px-3 rounded-xl transition-all shadow-sm"
              >
                Accept All
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
