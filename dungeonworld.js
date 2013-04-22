
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

    init: function init(enabled, value) {
        this.enabled = enabled;
        this.value = value;
    },

    getEnabled: function getEnabled() {
        return this.enabled;
    },

    setField: function setField(field) {
        this.field = field;
        $.each(this.getSourceFields(), function (index, dependentField) {
            dependentField.addDependentField(field);
        });
    },

    getField: function getField() {
        return this.field;
    },

    apply: function apply(value) {
        return this.value;
    },

    getSourceFields: function getSourceFields() {
        return [];
    }

});

// -------------------- ModifierStat calculates the modifier for a Dungeon World stat --------------------

var ModifierStat = Modifier.extend({

    init: function(stat) {
        this._super(true);
        this.statField = Field.getField(stat);
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
    }

});

// -------------------- ModifierClass is enabled when the className field has the given value --------------------

var ModifierClass = Modifier.extend({

    init: function init(classValue, value) {
        this._super(true, value);
        this.classValue = classValue;
        this.classField = Field.getField('className');
    },

    getEnabled: function getEnabled() {
        return (this.enabled && this.classField.getValue() == this.classValue);
    },

    getSourceFields: function getSourceFields() {
        return [ this.classField ];
    }

});

// ==================== A Field is a (possibly editable) value displayed on the sheet ====================

var Field = Class.extend({

    all: new Hash(),

    init: function init(name) {
        this.name = name;
        this.element = $("#" + name);
        this.defaultValue = (this.element) ? this.element.html() : undefined;
        this.value = this.defaultValue;
        this.baseValue = this.defaultValue;
        this.all.set(name, this);
        this.dependentFields = new Hash();
        this.modifiers = [];
        this.editing = false;
    },

    getValue: function() {
        return this.value;
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
        this.input.val(this.baseValue);
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
        modifier.setField(this);
        this.modifiers.push(modifier);
    },

    addDependentField: function addDependentField(field) {
        var name = field.name;
        this.dependentFields.set(name, (this.dependentFields[name] + 1) || 1);
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
        this.element.html(this.value);
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

Field.click = function () {
    var id = $(this).attr("id");
    var field = Field.getField(id);
    if (field) {
        field.startEditing();
    }
}

// -------------------- FieldInt holds an integer value --------------------

var FieldInt = Field.extend({

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
        this.input.html("");
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

// ==================== Initialise everything ====================

function addStat(name, modifier) {
    new FieldRange(name, 3, 18);
    new FieldBonus(modifier).addModifier(new ModifierStat(name));
}

$(document).ready(function () {

    new Field("name");
    addStat("strength", "str");
    addStat("dexterity", "dex");
    addStat("constitution", "con");
    addStat("intelligence", "int");
    addStat("wisdom", "wis");
    addStat("charisma", "cha");

    new Field("diceIcon");
    new Field("baseHp");

    new Field("classIcon");
    new FieldChoice("className", function () {
        return CustomPanel.prototype.all.get('Class').keys().sort();
    });

    $(".editable").click(Field.click);

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