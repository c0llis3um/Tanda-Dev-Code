import React, { useState, useEffect } from 'react';

const TandaCollateralControl = ({ tandaAmount, initialCollateral, onCollateralChange }) => {
  const [collateral, setCollateral] = useState(initialCollateral);
  const [isCollateralSufficient, setIsCollateralSufficient] = useState(false);

  // Define the minimum collateral requirement (e.g., 20% of the tanda amount)
  const MIN_COLLATERAL_PERCENTAGE = 0.2;
  const minimumCollateral = tandaAmount * MIN_COLLATERAL_PERCENTAGE;

  // Check if the collateral is sufficient whenever it changes
  useEffect(() => {
    const sufficient = collateral >= minimumCollateral;
    setIsCollateralSufficient(sufficient);
    onCollateralChange(collateral, sufficient);
  }, [collateral, minimumCollateral, onCollateralChange]);

  const handleCollateralChange = (event) => {
    const newCollateral = parseFloat(event.target.value);
    setCollateral(newCollateral);
  };

  return (
    <div>
      <h2>Tanda Collateral Control</h2>
      <div>
        <label htmlFor="collateral">Collateral Amount:</label>
        <input
          type="number"
          id="collateral"
          value={collateral}
          onChange={handleCollateralChange}
          min="0"
          step="0.01"
        />
      </div>
      <div>
        <p>Minimum Required Collateral: {minimumCollateral.toFixed(2)}</p>
        <p>
          Collateral Status:{" "}
          <span style={{ color: isCollateralSufficient ? "green" : "red" }}>
            {isCollateralSufficient ? "Sufficient" : "Insufficient"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default TandaCollateralControl;