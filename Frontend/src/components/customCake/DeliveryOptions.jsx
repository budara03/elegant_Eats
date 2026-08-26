import React, { useState } from "react";
import {
  FiCalendar,
  FiTruck,
  FiMapPin,
  FiClock,
  FiPhone,
  FiUser,
  FiNavigation,
  FiCheck,
  FiAlertCircle,
  FiExternalLink,
  FiRefreshCw,
  FiCompass,
  FiCheckCircle,
} from "react-icons/fi";

export default function DeliveryOptions({
  deliveryMethod,
  onChangeDeliveryMethod,
  deliveryDate,
  onChangeDeliveryDate,
  deliveryTimeSlot,
  onChangeDeliveryTimeSlot,
  deliveryAddress,
  onChangeDeliveryAddress,
  customerName,
  onChangeCustomerName,
  customerPhone,
  onChangeCustomerPhone,
  locationCoordinates,
  onChangeLocationCoordinates,
  locationMapsUrl,
  onChangeLocationMapsUrl,
}) {
  const [isLocating, setIsLocating] = useState(false);
  const [locationSuccess, setLocationSuccess] = useState(false);
  const [locationError, setLocationError] = useState("");
  const [detectedAreaName, setDetectedAreaName] = useState("");

  // Default Colombo coordinates if none fetched yet
  const isPinned = Boolean(locationCoordinates);
  const currentLat = locationCoordinates?.lat || 6.9271;
  const currentLng = locationCoordinates?.lng || 79.8612;

  // Minimum date: 2 days from today for custom cake preparation
  const today = new Date();
  const minDateObj = new Date(today);
  minDateObj.setDate(today.getDate() + 2);
  const minDateStr = minDateObj.toISOString().split("T")[0];

  // GPS Location Fetching
  const handleFetchLocation = () => {
    setLocationError("");
    setLocationSuccess(false);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const mapsUrl = `https://maps.google.com/?q=${latitude},${longitude}`;

        onChangeLocationCoordinates?.({ lat: latitude, lng: longitude });
        onChangeLocationMapsUrl?.(mapsUrl);

        try {
          // Reverse geocoding via OpenStreetMap Nominatim
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();

          if (data && data.display_name) {
            setDetectedAreaName(data.display_name);
            if (!deliveryAddress) {
              onChangeDeliveryAddress(data.display_name);
            }
          }
          setLocationSuccess(true);
        } catch (e) {
          setLocationSuccess(true);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError(
              "Location permission was denied. Please allow location access in your browser or type your address manually."
            );
            break;
          case error.POSITION_UNAVAILABLE:
            setLocationError(
              "Location information is unavailable. Please type your address manually."
            );
            break;
          case error.TIMEOUT:
            setLocationError("Location request timed out. Please try again.");
            break;
          default:
            setLocationError("Could not detect location. Please enter manually.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-bold text-[#6B6D43]">
          Customer Contact & Delivery Schedule
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Our bakery coordinator will contact you via WhatsApp / Call for final order confirmation.
        </p>
      </div>

      {/* Customer Contact Details */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 p-4 rounded-2xl bg-[#FDF4D2]/40 border border-[#946D6D]/15">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
            <FiUser className="w-3.5 h-3.5 text-[#CF7D65]" />
            Customer Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g., Sarah Fernando"
            value={customerName}
            onChange={(e) => onChangeCustomerName(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
            <FiPhone className="w-3.5 h-3.5 text-[#CF7D65]" />
            Contact Number (WhatsApp) *
          </label>
          <input
            type="tel"
            placeholder="e.g., 077 123 4567 / +94 77 123 4567"
            value={customerPhone}
            onChange={(e) => onChangeCustomerPhone(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] placeholder-gray-400 focus:outline-none transition shadow-2xs"
          />
        </div>
      </div>

      {/* Method: Delivery vs Pickup */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <button
          type="button"
          onClick={() => onChangeDeliveryMethod("delivery")}
          className={`p-4 rounded-2xl border-2 transition text-left cursor-pointer flex items-center gap-3 ${
            deliveryMethod === "delivery"
              ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
              : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
          }`}
        >
          <FiTruck className="w-5 h-5 text-[#CF7D65]" />
          <div>
            <span className="text-sm font-bold text-[#6B6D43] block">
              Cake Delivery
            </span>
            <span className="text-[10px] text-gray-500">
              Temperature Controlled (+ Rs. 650)
            </span>
          </div>
        </button>

        <button
          type="button"
          onClick={() => onChangeDeliveryMethod("pickup")}
          className={`p-4 rounded-2xl border-2 transition text-left cursor-pointer flex items-center gap-3 ${
            deliveryMethod === "pickup"
              ? "border-[#CF7D65] bg-[#F2DEC7]/60 shadow-md ring-2 ring-[#CF7D65]/20"
              : "border-[#E1B8A2]/60 bg-white hover:border-[#CF7D65]/60 hover:bg-[#FDF4D2]/30"
          }`}
        >
          <FiMapPin className="w-5 h-5 text-[#CF7D65]" />
          <div>
            <span className="text-sm font-bold text-[#6B6D43] block">
              Store Pickup
            </span>
            <span className="text-[10px] text-emerald-700 font-semibold">
              Colombo Outlet (Free)
            </span>
          </div>
        </button>
      </div>

      {/* Date & Time Selection */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5 text-[#CF7D65]" />
            Preferred Date *
          </label>
          <input
            type="date"
            min={minDateStr}
            value={deliveryDate}
            onChange={(e) => onChangeDeliveryDate(e.target.value)}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] focus:outline-none transition cursor-pointer shadow-2xs"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
            <FiClock className="w-3.5 h-3.5 text-[#CF7D65]" />
            Preferred Time Slot *
          </label>
          <select
            value={deliveryTimeSlot}
            onChange={(e) => onChangeDeliveryTimeSlot(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] focus:outline-none transition cursor-pointer shadow-2xs"
          >
            <option value="10:00 AM - 1:00 PM">Morning (10:00 AM - 1:00 PM)</option>
            <option value="1:00 PM - 4:00 PM">Afternoon (1:00 PM - 4:00 PM)</option>
            <option value="4:00 PM - 7:00 PM">Evening (4:00 PM - 7:00 PM)</option>
          </select>
        </div>
      </div>

      {/* 2 Separate Sections for Delivery: 1. Address + 2. Live Map Pin */}
      {deliveryMethod === "delivery" && (
        <div className="space-y-5 pt-2 border-t border-[#946D6D]/15">
          {/* SECTION 1: Delivery Destination Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
              <FiMapPin className="w-3.5 h-3.5 text-[#CF7D65]" />
              1. Delivery Destination Address (Street & Floor) *
            </label>
            <input
              type="text"
              placeholder="e.g., 42/B Galle Road, Colombo 03, Apartment 4B"
              value={deliveryAddress}
              onChange={(e) => onChangeDeliveryAddress(e.target.value)}
              required
              className="w-full px-3.5 py-2.5 rounded-xl border-2 border-[#E1B8A2]/60 focus:border-[#CF7D65] bg-white text-xs sm:text-sm text-[#6B6D43] placeholder-gray-400 focus:outline-none transition shadow-2xs"
            />
            <p className="text-[11px] text-gray-500">
              Provide house/building number, street name, apartment or landmark.
            </p>
          </div>

          {/* SECTION 2: Location Fetching & Interactive Map View */}
          <div className="space-y-3 p-4 sm:p-5 rounded-2xl bg-[#FDF4D2]/30 border border-[#946D6D]/15">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <label className="text-xs font-bold text-[#6B6D43] flex items-center gap-1.5">
                  <FiCompass className="w-3.5 h-3.5 text-[#CF7D65]" />
                  2. GPS Location & Live Map Pin
                </label>
                <p className="text-[11px] text-gray-500">
                  Detect your location so our delivery rider can navigate directly to your gate.
                </p>
              </div>

              {/* GPS Fetch Action Button */}
              <button
                type="button"
                onClick={handleFetchLocation}
                disabled={isLocating}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer w-fit ${
                  isPinned || locationSuccess
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200"
                    : "bg-[#CF7D65] hover:bg-[#6B6D43] text-white"
                }`}
              >
                {isLocating ? (
                  <>
                    <FiRefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Detecting GPS Location...</span>
                  </>
                ) : isPinned || locationSuccess ? (
                  <>
                    <FiCheckCircle className="w-3.5 h-3.5" />
                    <span> GPS Pinned </span>
                  </>
                ) : (
                  <>
                    <FiNavigation className="w-3.5 h-3.5" />
                    <span>📍 Detect My Location</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {locationError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-xs text-rose-700">
                <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{locationError}</span>
              </div>
            )}

            {/* Prominent Success Feedback Card when location is pinned */}
            {(isPinned || locationSuccess) && (
              <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-300 shadow-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                      <FiCheck className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-emerald-950 uppercase tracking-wide">
                        GPS Location Successfully Pinned & Verified
                      </h5>
                      <span className="text-[11px] text-emerald-700 font-medium">
                        Coordinates: Lat {currentLat.toFixed(5)}, Lng {currentLng.toFixed(5)}
                      </span>
                    </div>
                  </div>

                  {locationMapsUrl && (
                    <a
                      href={locationMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 transition inline-flex items-center gap-1 shadow-2xs"
                    >
                      <span>Open in Google Maps</span>
                      <FiExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                {detectedAreaName && (
                  <p className="text-[11px] text-emerald-800 pl-8 line-clamp-1 border-t border-emerald-200/60 pt-1.5">
                    📍 <strong>Detected Area:</strong> {detectedAreaName}
                  </p>
                )}
              </div>
            )}

            {/* Interactive Visual Map Container */}
            <div
              className={`relative w-full h-52 sm:h-60 rounded-2xl overflow-hidden shadow-inner transition-all duration-300 ${
                isPinned || locationSuccess
                  ? "border-2 border-emerald-500 ring-4 ring-emerald-100"
                  : "border-2 border-[#E1B8A2]/60 bg-gray-100"
              }`}
            >
              <iframe
                title="Delivery Location Map"
                src={`https://maps.google.com/maps?q=${currentLat},${currentLng}&hl=en&z=16&output=embed`}
                className="w-full h-full border-0"
                loading="lazy"
              />

              {/* Status Overlay Badge on Map */}
              <div className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs px-3 py-1.5 rounded-xl text-[11px] font-bold shadow-md border border-black/10 flex items-center gap-1.5">
                <span
                  className={`w-2.5 h-2.5 rounded-full ${
                    isPinned || locationSuccess
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-amber-500"
                  }`}
                />
                <span
                  className={
                    isPinned || locationSuccess
                      ? "text-emerald-800"
                      : "text-amber-800"
                  }
                >
                  {isPinned || locationSuccess
                    ? `Pinned: ${currentLat.toFixed(4)}, ${currentLng.toFixed(4)}`
                    : "Default: Colombo Center (Click 'Detect' to Pin)"}
                </span>
              </div>
            </div>

            {/* Explanatory footer notice */}
            <p className="text-[11px] text-gray-500 italic text-center sm:text-left">
              💡 Our delivery riders receive this exact satellite pin to ensure fast, zero-delay temperature-controlled delivery.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
