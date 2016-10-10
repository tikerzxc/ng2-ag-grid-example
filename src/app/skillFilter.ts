import RefData from './refData';

const SKILL_TEMPLATE =
    '<label style="border: 1px solid lightgrey; margin: 4px; padding: 4px; display: inline-block;">' +
    '  <span>' +
    '    <div style="text-align: center;">SKILL_NAME</div>' +
    '    <div>' +
    '      <input type="checkbox"/>' +
    '      <img src="assets/images/skills/SKILL.png" width="30px"/>' +
    '    </div>' +
    '  </span>' +
    '</label>';

const FILTER_TITLE =
    '<div style="text-align: center; background: lightgray; width: 100%; display: block; border-bottom: 1px solid grey;">' +
    '<b>TITLE_NAME</b>' +
    '</div>';

export default class SkillFilter {
    private filterChangedCallback: Function;
    private model: any;


    private init(params) {
        this.filterChangedCallback = params.filterChangedCallback;
        this.model = {
            android: false,
            css: false,
            html5: false,
            mac: false,
            windows: false
        };
    };

    private getModel() {
        return this.model;
    }
    private setModel(model) {
        this.model = model;
    }

    private getGui() {
        const eGui = document.createElement('div');
        eGui.style.width = '380px';
        const eInstructions = document.createElement('div');
        eInstructions.innerHTML = FILTER_TITLE.replace('TITLE_NAME', 'Custom Skills Filter');
        eGui.appendChild(eInstructions);

        const that = this;

        RefData.IT_SKILLS.forEach(function (skill, index) {
            const skillName = RefData.IT_SKILLS_NAMES[index];
            const eSpan = document.createElement('span');
            const html = SKILL_TEMPLATE.replace('SKILL_NAME', skillName).replace('SKILL', skill);
            eSpan.innerHTML = html;

            const eCheckbox = <HTMLInputElement>eSpan.querySelector('input');
            eCheckbox.addEventListener('click', function () {
                that.model[skill] = eCheckbox.checked;
                that.filterChangedCallback();
            });

            eGui.appendChild(eSpan);
        });

        return eGui;
    };

    private isFilterActive() {
        const model = this.model;
        const somethingSelected = model.android || model.css || model.html5 || model.mac || model.windows;
        return somethingSelected;
    };

    private doesFilterPass(params) {
        const rowSkills = params.data.skills;
        const model = this.model;
        let passed = true;

        RefData.IT_SKILLS.forEach(function (skill) {
            if (model[skill]) {
                if (!rowSkills[skill]) {
                    passed = false;
                }
            }
        });

        return passed;
    };
}