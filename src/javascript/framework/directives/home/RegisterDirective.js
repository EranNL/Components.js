import Directive from "../Directive";
import Node from "../../../components/dom/Node";
import HTTPRequest from "../../../components/http/HTTPRequest";
import Keyboard from "../../../components/util/Keyboard";

class RegisterDirective extends Directive {
    constructor(element) {
        super(element);


        this.stage = 0;
        this.avatar = this.element.find(".user");
        this.tile = this.element.find(".tile");
        this.glow = this.element.find(".spotlight");
        this.modal = this.element.find(".stage-modal");
        this.background = null;
        this.gender = "m";

        new Node(".next").on("click", this.checkStage.bind(this));
        new Node(".previous").on("click", this.previousStage.bind(this));
        new Node(".finish").on("click", this.finishRegistration.bind(this));

        Keyboard.register(this, {
            "ENTER": "checkStage"
        }, document);

        this.updateButtons();

        this.startStage();
    }

    updateButtons() {
        let previous = this.element.find(".previous");
        previous.css({display: "none"});

        if (this.stage > 0) {
            previous.css({display: "inline"});
        }
    }

    startStage() {
        this.avatar.animate({top: "519px"}, 1500, "ease-out", () => {
            this.walkToDesk();
        });

    }

    walkToDesk() {
        this.avatar

            .css({background: "url('../assets/images/register/walking_avatar.gif')"})
            .animate({left: "415px", top: "430px"}, 2500, "ease-out", () => {
                this.standForDesk();
            });
    }

    standForDesk() {
        this.avatar
            .css({background: "url('../assets/images/register/standing_avatar.gif')"});

        this.tile.animate({opacity: 1}, 500);
        this.glow.animate({opacity: 1}, 500, () => {
            this.initStage();
        });
    }

    initStage() {
        this.background = this.element.find(".modal-background");
        this.background
            .addClass("modal-background")
            .appendTo(".room")
            .animate({opacity: 1}, 500, () => {
                this.modal.animate({opacity: 1}, 500, () => {
                    this.loadStage(0);
                });
            });
    }

    loadStage(stage) {
        let stages = this.modal.find(".stage");
        let indicators = this.modal.find(".stage-indicators").find(".stage-indicator");

        indicators.each((indicator, i) => {
            if (i !== stage) {
                stages.get(i).css({display: "none"});
            }

            if (Number(indicator.getData("stage")) <= stage) {
                indicator.addClass("active");
            }
            else {
                indicator.removeClass("active");
            }
        });

        stages.get(stage).css({display: "block"});

        this.updateButtons();
    }

    nextStage() {
        this.loadStage(++this.stage);
    }

    previousStage() {
        this.loadStage(--this.stage);
    }

    checkStage() {
        let form = this.modal.find(".stage").get(this.stage).find(".modal-form");
        new HTTPRequest({
            url: this.config.get("url") + "/checkregister?" + form.serialize(false)
        }).then(result => {
            result = result.toJSON();
            let error = false;

            if (result.length) {
                for (let i = 0; i < result.length; i++) {
                    error = error === this.applyValidation(result[i]) ? error : this.applyValidation(result[i]);
                }
            }
            else {
                error = this.applyValidation(result);
            }

            if (!error) this.nextStage();
        });
    }

    applyValidation(result) {
        let form = this.modal.find(".stage").get(this.stage).find(".modal-form");

        if(result.error) {
            for (let input in result.message) {
                let formgroup = form.find(`[name="${input}"]`).parent();

                formgroup.removeClass("has-success").find(".help-block").remove();
                formgroup.addClass("has-error")
                    .append(`<div class="help-block">${result.message[input]}</div>`);
            }
        }
        else {
            form.find(".form-group").addClass("has-success");
        }

        return result.error;
    }

    finishRegistration() {
        new HTTPRequest({
            url: this.config.get("url") + "/register",
            method: "POST",
            headers: {
                "X-CSRF-TOKEN": this.config.csrf
            },
            data: {
                username: this.element.find("[name='username']").val(),
                password: this.element.find("[name='password']").val(),
                gender: this.element.find("[name='gender']:checked").val(),
                password_confirmation: this.element.find("[name='password_confirmation']").val(),
                mail: this.element.find("[name='mail']").val()
            }
        }).then(result => {
            if (!result.error) {
                this.walkToDoor();
                this.gender = this.element.find("[name='gender']:checked").val();
            }
        });
    }

    walkToDoor() {
        //fade out the tile
        this.tile.animate({opacity: 0}, 500);
        //fade out the spotlight
        this.glow.animate({opacity: 0}, 500);
        //fade out the regiater modal
        this.modal.animate({opacity: 0}, 500, () => {
            //remove the modal to prevent assholes doing stupid things
            this.modal.remove();
            //fade out the background
            this.background.animate({opacity: 0}, 500, () => {
                //let the avatar
                this.avatar
                    .addClass("flipped")
                    .css({background: "url('../assets/images/register/walking_avatar.gif')"})
                    .animate({left: "312px", top: "386px"}, 2000, () => {
                        this.avatar.animate({left: "255px", top: "318px"}, 1900, () => {
                            this.avatar.animate({left: "197px", top: "296px"}, 1500, () => {
                                this.avatar.removeClass("flipped")
                                    .animate({left: "248px", top: "267px"}, 1900, () => {
                                        this.avatar.css({background: "url('../assets/images/register/standing_avatar.gif')"});

                                        setTimeout(() => {
                                            this.avatar.animate({opacity: 0}, 500, () => {
                                                this.avatar
                                                    .css({
                                                        opacity: 1,
                                                        left: "228px",
                                                        width: "64px",
                                                        height: "110px",
                                                        top: 0,
                                                        background: `url("https://www.avatar-retro.com/habbo-imaging/avatarimage.php?figure=${this.gender === "m" ? "cp-3120-1408.lg-285-64.cc-260-1408.hr-165-37.sh-290-91.ch-3030-85.hd-209-1" : "ch-816-82.sh-907-64.lg-705-82.hd-600-1.hr-890-35"}&head_direction=0&direction=0&size=m&gesture=sml")`
                                                    })
                                                    .animate({top: "243px"}, 1000, () => {
                                                        window.location.href = "/me";
                                                    });
                                            });
                                        }, 500);
                                    });
                            });
                        });
                    });
            });
        });
    }
}

export default RegisterDirective;