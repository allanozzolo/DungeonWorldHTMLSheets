
// ==================== Floating menu ====================

var FloatingMenu = Class.extend({

    init: function init(id) {
        this.id = id;
        this.element = $("#" + this.id);
        var item = $("<h3/>");
        item.text("Menu");
        this.element.append(item);
    },

    addMenuItem: function addMenuItem(text, callback) {
        var item = $("<div/>");
        if (callback) {
            var anchor = $("<a/>");
            anchor.text(text);
            anchor.attr('href', '#');
            anchor.click(function (eventObject) {
                callback(eventObject);
                eventObject.preventDefault();
                eventObject.stopPropagation();
            });
            item.append(anchor);
        } else {
            item.html(text);
        }
        this.element.append(item);
    }

});

// ==================== A Modifier modifies the value of a Field ====================

var Modifier = Class.extend({

    init: function init(fieldId, enabled, value) {
        this.fieldId = fieldId
        this.enabled = enabled;
        this.value = value;
        this.add();
    },

    add: function add() {
        if (!this.field) {
            this.field = Field.getField(this.fieldId);
            if (!this.field) {
                throw "Unable to locate field with id " + this.fieldId;
            }
            this.field.addModifier(this);
            $.each(this.getSourceFields(), $.proxy(function (index, dependentField) {
                dependentField.addDependentField(this.field);
            }, this));
        }
    },

    remove: function remove() {
        if (this.field) {
            this.field.removeModifier(this);
            $.each(this.getSourceFields(), $.proxy(function (index, dependentField) {
                dependentField.removeDependentField(this.field);
            }, this));
            this.field = null;
        }
    },

    getEnabled: function getEnabled() {
        return this.enabled;
    },

    getField: function getField() {
        return this.field;
    },

    apply: function apply(value) {
        return this.value;
    },

    getSourceFields: function getSourceFields() {
        return [];
    },

    toString: function toString() {
        return this.value;
    }

});

// -------------------- ModifierStat calculates the modifier for a Dungeon World stat --------------------

var ModifierStat = Modifier.extend({

    init: function(fieldId, stat) {
        this.statField = Field.getField(stat);
        this._super(fieldId, true);
    },

    getSourceFields: function getSourceFields() {
        return [ this.statField ];
    },

    apply: function apply(value) {
        var stat = this.statField.getValue();
        if (stat <= 3) {
            return value - 3;
        } else if (stat <= 5) {
            return value - 2;
        } else if (stat <= 8) {
            return value - 1;
        } else if (stat <= 12) {
            return value;
        } else if (stat <= 15) {
            return value + 1;
        } else if (stat <= 17) {
            return value + 2;
        } else {
            return value + 3;
        }
    },

    toString: function toString() {
        return 'Modifier for ' + this.statField.name;
    }

});

// -------------------- ModifierClass is enabled when the className field has the given value --------------------

var ModifierClass = Modifier.extend({

    init: function init(fieldId, classValue, value) {
        this.classValue = classValue;
        this.classField = Field.getField('className');
        this._super(fieldId, true, value);
    },

    getEnabled: function getEnabled() {
        return (this.enabled && this.classField.getValue() == this.classValue);
    },

    getSourceFields: function getSourceFields() {
        return [ this.classField ];
    },

    toString: function toString() {
        return this.classValue;
    }

});

// -------------------- ModifierClassAppend appends its value --------------------

var ModifierClassAppend = ModifierClass.extend({

    init: function init(fieldId, classValue, value, between) {
        this._super(fieldId, classValue, value);
        this.between = between;
    },

    apply: function apply(value) {
        if (value) {
            return value + this.between + this.value;
        } else {
            return this.value;
        }
    }

});

// -------------------- ModifierClassHashSet sets values on a hash --------------------

var ModifierClassHashSet = ModifierClass.extend({

    init: function init(fieldId, classValue, key, value) {
        this._super(fieldId, classValue, value);
        this.key = key;
    },

    apply: function apply(value) {
        value.set(this.key, this.value);
        return value;
    }

});

// ==================== A Field is a (possibly editable) value displayed on the sheet ====================

var Field = Class.extend({

    all: new Hash(),

    init: function init(name) {
        this.name = name;
        this.element = $("#" + name);
        this.defaultValue = this.emptyValue();
        this.value = this.defaultValue;
        this.baseValue = this.defaultValue;
        this.all.set(name, this);
        this.dependentFields = new Hash();
        this.modifiers = [];
        this.editing = false;
    },

    emptyValue: function emptyValue() {
        return (this.element && this.element.html()) ? this.element.html() : '';
    },

    getValue: function getValue() {
        if (this.value == '&nbsp;') {
            return '';
        } else {
            return this.value;
        }
    },

    startEditing: function startEditing() {
        if (this.editing) {
            return;
        }
        if (!this.input) {
            this.input = this.renderEditing();
        }
        this.resetInput();
        this.element.html(this.input);
        this.editing = true;
        this.input.focus();
        this.input.blur($.proxy(this.blurEditing, this));
        this.input.keydown($.proxy(this.checkFinishKey, this));
    },

    renderEditing: function renderEditing() {
        return $("<input type='text'/>");
    },

    resetInput: function resetInput() {
        if (this.baseValue != '&nbsp;') {
            this.input.val(this.baseValue);
        } else {
            this.input.val('');
        }
    },

    blurEditing: function blurEditing() {
        this.inputField(this.getInputValue());
    },

    checkFinishKey: function checkFinishKey(eventObject) {
        if (eventObject.which == KeyEvent.DOM_VK_ESCAPE) {
            this.renderField();
            this.editing = false;
        } else if (eventObject.which == KeyEvent.DOM_VK_RETURN) {
            this.inputField(this.getInputValue());
        } else {
            return undefined;
        }
        return true;
    },

    getInputValue: function getInputValue() {
        return this.input.val();
    },

    inputField: function inputField(value) {
        this.editing = false;
        this.updateValue(value);
    },

    addModifier: function addModifier(modifier) {
        this.modifiers.push(modifier);
    },

    removeModifier: function removeModifier(modifier) {
        var index = this.modifiers.indexOf(modifier);
        if (index >= 0) {
            this.modifiers.splice(index, 1);
        }
    },

    addDependentField: function addDependentField(field) {
        var name = field.name;
        this.dependentFields.set(name, (this.dependentFields.get(name) + 1) || 1);
    },

    removeDependentField: function removeDependentField(field) {
        var name = field.name;
        if (this.dependentFields.get(name) == 1) {
            this.dependentFields.remove(name);
        } else {
            this.dependentFields.set(name, this.dependentFields.get(name) - 1);
        }
    },

    updateValue: function updateValue(value) {
        this.baseValue = value;
        this.value = value;
        this.applyModifiers();
        this.renderField();
        this.recalculateDependentFields();
    },

    applyModifiers: function applyModifiers() {
        for (var index = 0; index < this.modifiers.length; ++index) {
            var modifier = this.modifiers[index];
            if (modifier.getEnabled()) {
                this.value = modifier.apply(this.value);
            }
        }
    },

    renderField: function renderField() {
        if (this.value == '') {
            this.element.html(this.defaultValue);
        } else {
            this.element.html(this.value);
        }
    },

    recalculateDependentFields: function recalculateDependentFields() {
        $.each(this.dependentFields.keys(), function (index, fieldName) {
            var dependentField = Field.getField(fieldName);
            dependentField.recalculate();
        });
    },

    recalculate: function recalculate() {
        this.updateValue(this.baseValue);
    },

    reset: function reset() {
        this.value = this.defaultValue;
        this.baseValue = this.defaultValue;
        this.element.html(this.value);
    },

    showModifiers: function showModifiers() {
        var result = [];
        $.each(this.modifiers, function (index, modifier) {
            result.push(modifier.toString());
        });
        return result.join(", ");
    }

});

Field.getField = function (name) {
    return Field.prototype.all.get(name);
}

Field.callAll = function (selector, callback) {
    $(selector).each(function(index, element) {
        var id = $(element).attr("id");
        var field = Field.getField(id);
        if (field) {
            callback.call(field);
        }
    });
}

Field.clickEditable = function () {
    var id = $(this).attr("id");
    var field = Field.getField(id);
    if (field) {
        field.startEditing();
    }
}

// -------------------- FieldInt holds an integer value --------------------

var FieldInt = Field.extend({

    emptyValue: function emptyValue() {
        return 0;
    },

    updateValue: function updateValue(value) {
        this._super(parseInt(value) || 0);
    }

});

// -------------------- FieldBonus always displays a sign (plus or minus) --------------------

var FieldBonus = FieldInt.extend({

    renderField: function renderField() {
        if (this.value < 0) {
            this.element.html(this.value);
        } else {
            this.element.html("+" + this.value);
        }
    }

});

// -------------------- FieldChoice allows selection from a drop-down list --------------------

var FieldChoice = Field.extend({

    init: function init(id, options) {
        this._super(id);
        this.options = options;
    },

    getOptions: function getOptions() {
        if ($.isFunction(this.options)) {
            return this.options();
        } else {
            return this.options;
        }
    },

    renderEditing: function() {
        return $("<select/>");
    },

    resetInput: function resetInput() {
        this.input.empty();
        $.each(this.getOptions(), $.proxy(function (index, value) {
            var option = $("<option/>");
            option.attr('value', value);
            option.text(value);
            if (value == this.value) {
                option.attr('selected', true);
            }
            this.input.append(option);
        }, this));
        this.input.change($.proxy(this.blurEditing, this));
    }

});

// -------------------- FieldRange allows selecting from a numerical range --------------------

var FieldRange = FieldChoice.extend({

    init: function init(id, min, max) {
        var options = [];
        for (var count = min; count <= max; ++count) {
            options.push(count);
        }
        this._super(id, options);
    },

    updateValue: function updateValue(value) {
        this._super(parseInt(value));
    }

});

// -------------------- FieldHideShow is a field that hides and shows depending on another field --------------------

var FieldHideShow = Field.extend({

    init: function init(name, otherFieldId, hideRegexp) {
        this._super(name);
        this.otherField = Field.getField(otherFieldId);
        this.hideRegexp = hideRegexp;
        this.otherField.addDependentField(this);
    },

    recalculate: function recalculate() {
        this._super();
        if (this.hideRegexp.exec(this.otherField.getValue())) {
            this.element.hide();
        } else {
            this.element.show();
        }
    }

});

// -------------------- FieldSuggestion shows clickable suggestions for the FieldHideShow otherField --------------------

var FieldSuggestion = FieldHideShow.extend({

    init: function init(name, otherFieldId, hideRegexp, commaCount) {
        this._super(name, otherFieldId, hideRegexp);
        this.commaCount = commaCount;
    },

    renderField: function renderField() {
        this.element.empty();
        var first = true;
        $.each(this.value.split(/,\s*/), $.proxy(function (index, value) {
            if (value.indexOf('<') == 0) {
                $(value).appendTo(this.element);
                first = true;
            } else {
                if (first) {
                    first = false;
                } else {
                    this.element.append($('<span/>').text(', '));
                }
                $('<a/>').addClass('suggestion').text(value).click(value, $.proxy(this.applySuggestion, this)).appendTo(this.element);
            }
        }, this));
    },

    applySuggestion: function applySuggestion(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        var value = evt.data;
        if (this.commaCount !== undefined) {
            var prevValueArray = this.otherField.getValue().split(/,[\s]*/g);
            while (prevValueArray.length < this.commaCount) {
                prevValueArray.push('');
            }
            prevValueArray[this.commaCount] = value;
            value = prevValueArray.join(', ');
        }
        this.otherField.updateValue(value);
    }

});

// -------------------- FieldDescriptionList is a field that contains elements of a DL --------------------

var FieldDescriptionList = Field.extend({

    emptyValue: function emptyValue() {
        return new Hash();
    },

    renderField: function renderField() {
        this.element.empty();
        var keys = this.value.keys().sort(function (a, b) {
            var order = ['Lawful', 'Good', 'Neutral', 'Chaotic', 'Evil'];
            var aIndex = order.indexOf(a);
            var bIndex = order.indexOf(b);
            if (aIndex < bIndex) {
                return -1;
            } else if (aIndex > bIndex) {
                return 1;
            } else {
                return 0;
            }
        });
        $.each(keys, $.proxy(function (index, key) {
            $('<dt/>').html(key).appendTo(this.element);
            $('<dd/>').html(this.value.get(key)).appendTo(this.element);
        }, this));
    },

    recalculate: function recalculate() {
        this.value.clear();
        this._super();
    }

});

// ==================== Initialise everything ====================

$(document).ready(function () {

    new Field("name");
    new FieldSuggestion("nameSuggestions", 'name', /[^\s]/);

    new Field("look");
    new FieldSuggestion("lookSuggestions1", 'look', /^\s*[^\s,]+\s*/, 0);
    new FieldSuggestion("lookSuggestions2", 'look', /^[^,]*,\s*[^\s,]+/, 1);
    new FieldSuggestion("lookSuggestions3", 'look', /^[^,]*,[^,]*,\s*[^\s,]+/, 2);
    new FieldSuggestion("lookSuggestions4", 'look', /^[^,]*,[^,]*,[^,]*,\s*[^\s,]+/, 3);

    $.each([ "strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma" ], function (index, stat) {
        var modifier = stat.substring(0, 3);
        new FieldRange(stat, 3, 18);
        new FieldBonus(modifier);
        new ModifierStat(modifier, stat)
    });

    new Field("diceIcon");
    new Field("baseHp");

    new Field("classIcon");

    new FieldDescriptionList("alignment");
    new FieldDescriptionList("race");

    new FieldChoice("className", function () {
        return CustomPanel.prototype.all.get('Class').keys().sort();
    });

    $(".editable").click(Field.clickEditable);

    var menu = new FloatingMenu('floatMenu');
    menu.addMenuItem("New character...", function () {
        Field.callAll(".field", Field.prototype.reset);
    });
    menu.addMenuItem("Load...");
    menu.addMenuItem("Save As...");
    menu.addMenuItem("Save to URL");

    menu.addMenuItem('<hr/>');

    topPanel = new TopPanel();
    menu.addMenuItem("Edit Source Data...", function () {
        topPanel.showPanel();
    });

});
