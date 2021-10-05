var cart = new function () {
    this.$totalAmount = null;
    this.$totalAmountNoun = null;
    this.$totalItemsCount = null;
    this.$totalItemsCountNoun = null;
    this.$totalPrice = null;

    this.bIsCart = null;
    this.bIsRequestComplete = true;
    this.itemsWeight = {};
    this.itemsVolume = {};

    this.init = function () {
        this.$totalAmount = $('*[data-cart=total-amount]');
        this.$totalAmountNoun = $('*[data-cart=total-amount-noun]');
        this.$totalItemsCount = $('*[data-cart=total-items-count]');
        this.$totalItemsCountNoun = $('*[data-cart=total-items-count-noun]');
        this.$totalPrice = $('*[data-cart=total-price]');

        this.bIsCart = ($('*[data-cart=cart]').length > 0);

        var $body = $('body');

        $body.on('click', '*[data-cart=add]', function (e) {
            e.preventDefault();

            var id = $(this).data('id');

            basket.putElement(
                id, {
                    amount: $($(this).data('amount-wrapper')).val()
                },
                cart.replace(id, 'element', $(this))
            );
        });

        $body.on('click', '*[data-cart=remove]', function (e) {
            e.preventDefault();

            var id = $(this).data('id');

            basket.removeItem(id, cart.replace(id, 'item'));
        });

        $('input[data-cart=item-amount]').on('focusin', function () {
            var $input = $(this);
            $input.data('amount', $input.val());
        }).on('change', function () {
            var $input = $(this);

            cart.modify($input.data('id'), $input.val(), $input.data('amount'));
        });

        $body.on('click', '*[data-cart=remove_all]', function (e) {
            e.preventDefault();

            if (confirm('Вы действительно хотите удалить все товары из вашей корзины?')) {
                window.location.href = '/emarket/basket/remove_all/';
            }
        });

        if(this.bIsCart) {
            $('tr[data-cart=item]').each(function() {
                var id = $(this).data('id');

                cart.itemsWeight[id] = parseFloat($(this).data('weight'));
                cart.itemsVolume[id] = parseFloat($(this).data('volume'));
            });
        }
    };

    this.modify = function (id, amountNew, amountOld) {
        if (this.bIsRequestComplete && amountNew.replace(/[\d]+/) == 'undefined' && amountNew != amountOld) {
            this.bIsRequestComplete = false;
            basket.modifyItem(id, {amount: amountNew}, this.replace(id, 'item'));
        } else {
            this.bIsRequestComplete = true;
        }
    };

    this.replace = function (id, itemType, node) {
        return function (e) {
            var bHasItems = (typeof e.items !== 'undefined' && typeof e.items.item !== 'undefined'),
                itemsCount = bHasItems ? Object.keys(e['items']['item']).length : 0;

            cart.bIsRequestComplete = true;

            cart.$totalAmount.each(function () {
                if ($(this).data('postfix')) {
                    $(this).html(e.summary.amount + $(this).data('postfix'));
                } else {
                    $(this).text(e.summary.amount);
                }
            });

            cart.$totalAmountNoun.text(getNumEnding(parseInt(e.summary.amount), ['товар', 'товара', 'товаров']));

            cart.$totalItemsCount.each(function () {
                if ($(this).data('postfix')) {
                    $(this).html(itemsCount + $(this).data('postfix'));
                } else {
                    $(this).text(itemsCount);
                }
            });

            cart.$totalItemsCountNoun.text(getNumEnding(parseInt(itemsCount), ['товар', 'товара', 'товаров']));

            var totalPriceText = formatPrice(e.summary.price.actual);
            cart.$totalPrice.each(function () {
                if ($(this).data('postfix')) {
                    $(this).html(totalPriceText + $(this).data('postfix'));
                } else {
                    $(this).text(totalPriceText);
                }
            });

            if (bHasItems) {
                var bRemove = true,
                    totalWeight = 0,
                    totalVolume = 0;

                for (var i in e.items.item) {
                    var item = e.items.item[i],
                        itemId = item.id,
                        amount = item['amount'],
                        price = item['price']['actual'],
                        totalPrice = Number(item['total-price']['actual']);

                    if (itemType == 'item') {
                        if (itemId == id) {
                            bRemove = false;
                        } else {

                        }
                    }

                    if(cart.bIsCart) {
                        if(!!cart.itemsWeight[itemId]) {
                            totalWeight += (cart.itemsWeight[itemId] * amount);
                        }

                        if(!!cart.itemsVolume[itemId]) {
                            totalVolume += (cart.itemsVolume[itemId] * amount);
                        }
                    }

                    $('*[data-cart=item-price][data-id=' + itemId + ']').text(formatPrice(price));
                    $('*[data-cart=item-total-price][data-id=' + itemId + ']').text(formatPrice(totalPrice));
                }

                switch (itemType) {
                    case 'element':
                    {
                        if (node) {
                            if (node.data('cart-added-class')) {
                                node.addClass(node.data('cart-added-class'));
                            }
                            if (node.data('cart-added-text')) {
                                node.text(node.data('cart-added-text'));
                            }

                            if (node.data('cart-link')) {
                                jQuery.ajax({
                                    url: node.data('cart-link'),
                                    type: 'GET',
                                    dataType: 'json',
                                    data: {template: 'cart_added'},
                                    success: function (data) {
                                        if (!!data['html']) {
                                            $('div[data-cart=modal-added-content]').html(data['html']);
                                            $('div[data-cart=modal-added]').modal('show');
                                        }
                                    }
                                });
                            }
                        }

                        break;
                    }
                    case 'item':
                    {
                        if (bRemove) {
                            $('*[data-cart=item][data-id=' + id + ']').remove();
                        }

                        break;
                    }
                }

                if(cart.bIsCart) {
                    $('*[data-cart=total-weight]').each(function() {
                        $(this).html($(this).data('prefix') + totalWeight.toLocaleString('en-US', {useGrouping: false}) + $(this).data('postfix'));
                    });
                    $('*[data-cart=total-volume]').each(function() {
                        $(this).html($(this).data('prefix') + totalVolume.toLocaleString('en-US', {useGrouping: false}) + $(this).data('postfix'));
                    });
                }
            } else {
                if (cart.bIsCart) {
                    location.reload();
                }
            }
        };
    };
};

$(document).ready(function () {
    cart.init();
});

function formatPrice(number) {
    if (typeof number !== 'Number') {
        number = Number(number);
    }

    if (isNaN(number)) {
        number = 0;
    }

    return number.format(2, 3, ' ');
}

function getNumEnding(iNumber, aEndings) {
    var sEnding, i;
    iNumber = iNumber % 100;
    if (iNumber >= 11 && iNumber <= 19) {
        sEnding = aEndings[2];
    }
    else {
        i = iNumber % 10;
        switch (i) {
            case (1):
                sEnding = aEndings[0];
                break;
            case (2):
            case (3):
            case (4):
                sEnding = aEndings[1];
                break;
            default:
                sEnding = aEndings[2];
        }
    }
    return sEnding;
}

Number.prototype.format = function (n, x, s, c) {
    var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
        num = this.toFixed(Math.max(0, ~~n));

    return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};