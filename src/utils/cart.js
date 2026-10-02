export const calculateCart = (items = []) => {
  const subtotal = items.reduce((sum, entry) => sum + entry.product.price * entry.quantity, 0);
  const delivery = subtotal === 0 || subtotal >= 299 ? 0 : 19;
  return { subtotal, delivery, total: subtotal + delivery };
};
