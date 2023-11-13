const luhnAlgorithm = (cardNumber: string): boolean => {
      const sanitizedCardNumber = cardNumber.replace(/\D/g, '');
    
      if (!/^\d{2,}$/.test(sanitizedCardNumber)) {
        return false;
      }
    
      let sum = 0;
      let double = false;
    
      for (let i = sanitizedCardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedCardNumber[i], 10);
    
        if (double) {
          digit *= 2;
    
          if (digit > 9) {
            digit -= 9;
          }
        }
    
        sum += digit;
    
        double = !double;
      }
    
      return sum % 10 === 0;
    };
    
    export default luhnAlgorithm;
    