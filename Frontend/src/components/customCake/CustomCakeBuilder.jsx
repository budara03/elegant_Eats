import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiArrowRight,
  FiArrowLeft,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import {
  cakeShapes,
  cakeSizes,
  cakeFlavors,
  cakeFillings,
  cakeColors,
} from "../../data/customCakeOptions";
import BuilderProgress from "./BuilderProgress";
import CakePreview from "./CakePreview";
import DesignModeSelector from "./DesignModeSelector";
import CakeShapeSelector from "./CakeShapeSelector";
import CakeSizeSelector from "./CakeSizeSelector";
import CakeFlavorSelector from "./CakeFlavorSelector";
import CakeFillingSelector from "./CakeFillingSelector";
import CakeColorSelector from "./CakeColorSelector";
import CakeDecorationSelector from "./CakeDecorationSelector";
import CakeMessageInput from "./CakeMessageInput";
import ImageUpload from "./ImageUpload";
import SpecialInstructions from "./SpecialInstructions";
import DeliveryOptions from "./DeliveryOptions";
import PriceSummary from "./PriceSummary";
import CustomCakeReview from "./CustomCakeReview";

export default function CustomCakeBuilder() {
  const navigate = useNavigate();

  // Default delivery date (2 days from today)
  const defaultDate = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split("T")[0];
  }, []);

  // Design Mode State: 'scratch' | 'photo'
  const [designMode, setDesignMode] = useState("photo");

  // Main Builder State
  const [cake, setCake] = useState({
    shape: cakeShapes[0], // Default: Classic Round
    size: cakeSizes[1], // Default: 1 kg
    flavor: cakeFlavors[0], // Default: Chocolate
    filling: cakeFillings[0], // Default: Chocolate Ganache
    color: cakeColors[0], // Default: Rose Pink
    decorations: [],
    message: "",
    inspirationImage: null,
    specialInstructions: "",
    customerName: "",
    customerPhone: "",
    locationCoordinates: null, // { lat, lng }
    locationMapsUrl: "",
    deliveryDate: defaultDate,
    deliveryTimeSlot: "1:00 PM - 4:00 PM",
    deliveryMethod: "delivery",
    deliveryAddress: "",
    quantity: 1,
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(1);
  const [validationError, setValidationError] = useState("");
  const [addedSuccess, setAddedSuccess] = useState(false);

  // Total steps is 8
  const totalSteps = 8;

  // Dynamic Price Calculation
  const totalPrice = useMemo(() => {
    const basePrice = cake.size ? cake.size.price : 0;
    const flavorPrice = cake.flavor ? cake.flavor.price : 0;
    const fillingPrice = cake.filling ? cake.filling.price : 0;
    // If in photo mode, base custom craft fee applies or decor price in scratch mode
    const decorPrice =
      designMode === "photo"
        ? 500 // Flat custom design replication base
        : cake.decorations.reduce((sum, d) => sum + (d.price || 0), 0);

    const deliveryFee = cake.deliveryMethod === "delivery" ? 650 : 0;

    const itemSubtotal = basePrice + flavorPrice + fillingPrice + decorPrice;
    return itemSubtotal * cake.quantity + (cake.quantity > 0 ? deliveryFee : 0);
  }, [cake, designMode]);

  // Step Validation
  const validateCurrentStep = () => {
    setValidationError("");

    // Step 1 validation (Photo Mode require image)
    if (currentStep === 1 && designMode === "photo" && !cake.inspirationImage) {
      setValidationError(
        "Please upload your inspiration photo reference so our pastry chefs can replicate your design."
      );
      return false;
    }

    // Step 2 validation (Shape)
    if (currentStep === 2 && !cake.shape) {
      setValidationError("Please select a cake shape before continuing.");
      return false;
    }

    // Step 3 validation (Size)
    if (currentStep === 3 && !cake.size) {
      setValidationError("Please select a cake size before continuing.");
      return false;
    }

    // Step 4 validation (Flavor)
    if (currentStep === 4 && !cake.flavor) {
      setValidationError("Please select a sponge flavor before continuing.");
      return false;
    }

    // Step 5 validation (Filling)
    if (currentStep === 5 && !cake.filling) {
      setValidationError("Please select a cake filling before continuing.");
      return false;
    }

    // Step 8 validation (Customer Contact & Delivery)
    if (currentStep === 8) {
      if (!cake.customerName.trim()) {
        setValidationError("Please enter your full name for order confirmation.");
        return false;
      }
      if (!cake.customerPhone.trim()) {
        setValidationError("Please provide your contact number / WhatsApp for delivery coordination.");
        return false;
      }
      if (!cake.deliveryDate) {
        setValidationError("Please specify a preferred delivery date.");
        return false;
      }
      if (cake.deliveryMethod === "delivery" && !cake.deliveryAddress.trim()) {
        setValidationError("Please provide a delivery destination address.");
        return false;
      }
    }

    return true;
  };

  const handleNextStep = () => {
    if (!validateCurrentStep()) return;

    if (currentStep < totalSteps) {
      const next = currentStep + 1;
      setCurrentStep(next);
      if (next > maxStepReached) setMaxStepReached(next);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setValidationError("");
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  const handleStepJump = (stepNumber) => {
    if (stepNumber <= maxStepReached) {
      setValidationError("");
      setCurrentStep(stepNumber);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  };

  // Decoration Toggle
  const handleToggleDecoration = (decor) => {
    setCake((prev) => {
      const exists = prev.decorations.some((d) => d.id === decor.id);
      if (exists) {
        return {
          ...prev,
          decorations: prev.decorations.filter((d) => d.id !== decor.id),
        };
      } else {
        return {
          ...prev,
          decorations: [...prev.decorations, decor],
        };
      }
    });
  };

  // Add To Cart Action
  const handleAddToCart = () => {
    if (!validateCurrentStep()) return;

    const customCartItem = {
      id: `custom-cake-${Date.now()}`,
      type: "custom-cake",
      designMode,
      name: `Custom ${cake.shape?.name || "Round"} ${cake.size.name} ${cake.flavor.name} Cake`,
      customerName: cake.customerName,
      customerPhone: cake.customerPhone,
      locationCoordinates: cake.locationCoordinates,
      locationMapsUrl: cake.locationMapsUrl,
      shape: cake.shape,
      size: cake.size,
      flavor: cake.flavor,
      filling: cake.filling,
      color: cake.color,
      decorations:
        designMode === "photo"
          ? [{ name: "Custom Reference Replicated", price: 500 }]
          : cake.decorations,
      message: cake.message,
      inspirationImage: cake.inspirationImage,
      specialInstructions: cake.specialInstructions,
      deliveryDate: cake.deliveryDate,
      deliveryTimeSlot: cake.deliveryTimeSlot,
      deliveryMethod: cake.deliveryMethod,
      deliveryAddress: cake.deliveryAddress,
      quantity: cake.quantity,
      totalPrice: totalPrice,
      timestamp: new Date().toISOString(),
    };

    console.log("Custom Cake added to cart:", customCartItem);

    // Save to LocalStorage cart
    try {
      const existingCart = JSON.parse(
        localStorage.getItem("elegant_eats_cart") || "[]"
      );
      localStorage.setItem(
        "elegant_eats_cart",
        JSON.stringify([...existingCart, customCartItem])
      );
    } catch (e) {
      console.warn("Storage cart update fallback", e);
    }

    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
    }, 4000);
  };

  // Ask Owner About This Cake
  const handleAskOwner = () => {
    const decorList =
      designMode === "photo"
        ? "Custom design from photo reference"
        : cake.decorations.map((d) => d.name).join(", ") || "None";

    const summary = [
      `🎂 Custom Cake Inquiry`,
      `Shape: ${cake.shape?.name || "—"}`,
      `Size: ${cake.size?.name || "—"}`,
      `Flavor: ${cake.flavor?.name || "—"}`,
      `Filling: ${cake.filling?.name || "—"}`,
      `Color: ${cake.color?.name || "—"}`,
      `Decorations: ${decorList}`,
      cake.message ? `Cake Message: "${cake.message}"` : null,
      cake.specialInstructions
        ? `Special Instructions: ${cake.specialInstructions}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    navigate("/chat", { state: { prefillMessage: summary } });
  };

  return (
    <div className="w-full space-y-6">
      {/* Step Progress Tracker */}
      <BuilderProgress
        currentStep={currentStep}
        onStepClick={handleStepJump}
        maxStepReached={maxStepReached}
        designMode={designMode}
      />

      {/* Main 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Visual Cake Live Preview (45% on desktop) */}
        <div className="lg:col-span-5 w-full">
          <CakePreview
            cake={cake}
            totalPrice={totalPrice}
            designMode={designMode}
          />
        </div>

        {/* Right Column: Interactive Customization Step Container (55% on desktop) */}
        <div className="lg:col-span-7 w-full space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-[#946D6D]/15 min-h-[480px] flex flex-col justify-between">
            {/* Step Animated Form Container */}
            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${designMode}-${currentStep}`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Step 1: Design Mode Choice & Photo Upload */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <DesignModeSelector
                        designMode={designMode}
                        onSelectMode={(mode) => {
                          setDesignMode(mode);
                          setValidationError("");
                        }}
                      />

                      {designMode === "photo" && (
                        <div className="pt-2">
                          <ImageUpload
                            image={cake.inspirationImage}
                            onImageChange={(inspirationImage) =>
                              setCake({ ...cake, inspirationImage })
                            }
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Shape */}
                  {currentStep === 2 && (
                    <CakeShapeSelector
                      selectedShape={cake.shape}
                      onSelectShape={(shape) => setCake({ ...cake, shape })}
                    />
                  )}

                  {/* Step 3: Size */}
                  {currentStep === 3 && (
                    <CakeSizeSelector
                      selectedSize={cake.size}
                      onSelectSize={(size) => setCake({ ...cake, size })}
                    />
                  )}

                  {/* Step 4: Flavor */}
                  {currentStep === 4 && (
                    <CakeFlavorSelector
                      selectedFlavor={cake.flavor}
                      onSelectFlavor={(flavor) => setCake({ ...cake, flavor })}
                    />
                  )}

                  {/* Step 5: Filling */}
                  {currentStep === 5 && (
                    <CakeFillingSelector
                      selectedFilling={cake.filling}
                      onSelectFilling={(filling) => setCake({ ...cake, filling })}
                    />
                  )}

                  {/* Step 6: Color or Decorations */}
                  {currentStep === 6 && (
                    <div className="space-y-6">
                      <CakeColorSelector
                        selectedColor={cake.color}
                        onSelectColor={(color) => setCake({ ...cake, color })}
                      />

                      {designMode === "scratch" && (
                        <>
                          <hr className="border-t border-[#946D6D]/10" />
                          <CakeDecorationSelector
                            selectedDecorations={cake.decorations}
                            onToggleDecoration={handleToggleDecoration}
                          />
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 7: Message, Instructions & Inspiration */}
                  {currentStep === 7 && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-xl font-bold text-[#6B6D43]">
                          7. Custom Greeting & Chef Instructions
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Add custom hand-piped wording and special pastry chef instructions.
                        </p>
                      </div>

                      <CakeMessageInput
                        message={cake.message}
                        onChangeMessage={(message) =>
                          setCake({ ...cake, message })
                        }
                      />

                      <hr className="border-t border-[#946D6D]/10" />

                      <SpecialInstructions
                        instructions={cake.specialInstructions}
                        onChangeInstructions={(specialInstructions) =>
                          setCake({ ...cake, specialInstructions })
                        }
                      />

                      {designMode === "scratch" && (
                        <>
                          <hr className="border-t border-[#946D6D]/10" />
                          <ImageUpload
                            image={cake.inspirationImage}
                            onImageChange={(inspirationImage) =>
                              setCake({ ...cake, inspirationImage })
                            }
                          />
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 8: Contact, Delivery & Review */}
                  {currentStep === 8 && (
                    <div className="space-y-6">
                      <DeliveryOptions
                        customerName={cake.customerName}
                        onChangeCustomerName={(customerName) =>
                          setCake({ ...cake, customerName })
                        }
                        customerPhone={cake.customerPhone}
                        onChangeCustomerPhone={(customerPhone) =>
                          setCake({ ...cake, customerPhone })
                        }
                        locationCoordinates={cake.locationCoordinates}
                        onChangeLocationCoordinates={(locationCoordinates) =>
                          setCake({ ...cake, locationCoordinates })
                        }
                        locationMapsUrl={cake.locationMapsUrl}
                        onChangeLocationMapsUrl={(locationMapsUrl) =>
                          setCake({ ...cake, locationMapsUrl })
                        }
                        deliveryMethod={cake.deliveryMethod}
                        onChangeDeliveryMethod={(deliveryMethod) =>
                          setCake({ ...cake, deliveryMethod })
                        }
                        deliveryDate={cake.deliveryDate}
                        onChangeDeliveryDate={(deliveryDate) =>
                          setCake({ ...cake, deliveryDate })
                        }
                        deliveryTimeSlot={cake.deliveryTimeSlot}
                        onChangeDeliveryTimeSlot={(deliveryTimeSlot) =>
                          setCake({ ...cake, deliveryTimeSlot })
                        }
                        deliveryAddress={cake.deliveryAddress}
                        onChangeDeliveryAddress={(deliveryAddress) =>
                          setCake({ ...cake, deliveryAddress })
                        }
                      />

                      <hr className="border-t border-[#946D6D]/10" />

                      <CustomCakeReview
                        cake={cake}
                        onEditStep={(stepNum) => handleStepJump(stepNum)}
                        designMode={designMode}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Validation Error Message */}
            {validationError && (
              <div className="mt-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs font-semibold text-rose-700 flex items-center gap-2">
                <FiAlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            {/* Step Navigation Buttons */}
            <div className="pt-6 mt-6 border-t border-[#946D6D]/10 flex items-center justify-between gap-4">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-5 py-3 rounded-2xl border-2 border-[#E1B8A2] text-[#6B6D43] font-bold text-xs sm:text-sm hover:bg-[#FDF4D2]/40 transition flex items-center gap-1.5 cursor-pointer"
                >
                  <FiArrowLeft className="w-4 h-4" />
                  Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-7 py-3 rounded-2xl bg-[#CF7D65] hover:bg-[#6B6D43] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer ml-auto"
                >
                  <span>Next Step</span>
                  <FiArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleAskOwner}
                    className="px-5 py-3 rounded-2xl border-2 border-[#6B6D43] text-[#6B6D43] font-bold text-xs sm:text-sm hover:bg-[#6B6D43]/10 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    💬 Ask Owner About This Cake
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className="px-7 py-3.5 rounded-2xl bg-[#CF7D65] hover:bg-[#6B6D43] text-white font-bold text-xs sm:text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <FiCheckCircle className="w-4 h-4" />
                    Confirm &amp; Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Bottom Dynamic Price Summary */}
          <PriceSummary
            cake={cake}
            onAddToCart={handleAddToCart}
            onChangeQuantity={(quantity) => setCake({ ...cake, quantity })}
            addedSuccess={addedSuccess}
          />
        </div>
      </div>
    </div>
  );
}
