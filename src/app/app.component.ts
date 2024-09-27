import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { erf, sqrt } from 'mathjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true, // Mark this as a standalone component
  imports: [FormsModule] // Add FormsModule here
})
export class AppComponent {
  discount: number = 0;
  incentive: number = 0;
  incentivePercentage: number = 0;
  realisticDiscount: number = 0;

  // Constants for the incentive calculation
  topDiscount: number = 22.0;    // E44: Top Discount
  targetDiscount: number = 25.7; // E42: Target Discount
  floorDiscount: number = 29.4;  // D44: Floor Discount
  baseIncentive: number= 1000;
  D46: number = 0; // Value of D46 calculated based on simulatedDiscount


// Method to calculate D46 based on simulatedDiscount
calculateD46(): number {
  return this.discount; // Use slider value directly
}

public calculateDiscountSimulation(): number {
  const D46 = this.calculateD46(); // Update D46
  const discountSimulation = (-(D46 / 1000)+ (this.floorDiscount/100) + 0.1)*100
  

  return discountSimulation;
}



  // Method to update the graphs or UI
  updateGraphs() {
    this.incentive = this.calculateIncentive(this.calculateDiscountSimulation());
    this.realisticDiscount = this.calculateRealisticDiscount(this.calculateDiscountSimulation());
  }

  calculateIncentive(discount: number): number {
   ;
  
    if (discount > this.floorDiscount) {
      return 0; 
    }
  
    // If discount is between targetDiscount and floorDiscount
    if (discount <= this.floorDiscount && discount > this.targetDiscount) {
      // Incentive calculation based on a linear payout function (first range)
      const slope = (this.baseIncentive - 0) / (this.targetDiscount - this.floorDiscount); // Linear slope
      const result = slope * (discount - this.floorDiscount) + this.baseIncentive;
      return result; // Incentive in the first range
    }
  
    // If discount is lower than or equal to the target discount
    else if (discount <= this.targetDiscount && discount >= this.topDiscount) {
      // Incentive calculation for the second range (steeper payout)
      const slope = (this.baseIncentive - 100) / (this.targetDiscount - this.topDiscount); // Steeper linear slope
      const result = slope * (discount - this.targetDiscount) + this.baseIncentive;
      return result; // Incentive in the second range
    } 
    
    // Default case: ensure payout when discount falls in unexpected range
    else {
      return this.baseIncentive; // Base incentive if it's within bounds but unexpected case
    }
  }
  

  calculateRealisticDiscount(discount: number): number {

    const a = 24/100
    const b=0.1
    discount=discount/100
    console.log(discount-a)
    const probability = (0.5 * (1 + erf((discount - a) / (b * Math.sqrt(2)))))*100;
    console.log(probability)

    return probability // Example calculation
  }
}
