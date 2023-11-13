const allowedDomains = ['gmail.com', 'hotmail.com', 'yahoo.es'];

const emailValidator = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return false;
  }

  const [, domain] = email.split('@');

  return allowedDomains.includes(domain);
};

export default emailValidator;
