function Net() {
    var self = this;

    function construct() {
        client.on("logged", function (valid) {
            if (valid) {
                memo.loggedIn();
                client.emit("get_info_bar");
            }
            else {
                memo.gui.dialog("information", "Nie udało się zalogować", {
                    onOkClick: function () {
                        this.close();
                    }
                });
            }
        });

        client.on("registered", function (valid) {
            if (valid)
                memo.gui.dialog("information", "Rejestracja zakończona pomyślnie", {
                onOkClick: function () {
                    this.close();
                }
            });
            else
                memo.gui.dialog("information", "Nie udało się zarejestrować", {
                    onOkClick: function () {
                        this.close();
                    }
                });
        });

        client.on("make_ranking", function (users) {
            memo.gui.makeRanking(users);
        });

        client.on("tip_waiting", function () {
            memo.gui.tip("Oczekiwanie na przeciwnika...");
        });

        client.on("player_join", function (nickname) {
            memo.gui.tip(nickname + " dołączył do gry!");
            client.emit("get_info_bar");
        });

        client.on("player_left", function (nickname) {
            memo.gui.tip(nickname + " opuścił grę");
            client.emit("get_info_bar");
        });

        client.on("update_players", function (firstPlayer, secondPlayer, queue) {
            console.log(firstPlayer, secondPlayer, queue);
            memo.gui.setPlayers(firstPlayer.nickname, secondPlayer.nickname);
            memo.gui.makeQueue(queue);
        });

        client.on("first_player_won", function () {
            self.timerOneReset();
            self.timerTwoReset();

            memo.gui.dialog("question", "Wygrałeś! Grasz dalej?", {
                onYesClick: function () {
                    client.emit("first_player_response", true);
                    this.close();
                },
                onNoClick: function () {
                    client.emit("first_player_response", false);
                    this.close();
                }
            });
        });

        client.on("second_player_won", function () {
            self.timerOneReset();
            self.timerTwoReset();

            memo.gui.dialog("question", "Wygrałeś! Grasz dalej?", {
                onYesClick: function () {
                    client.emit("second_player_response", true);
                    this.close();
                },
                onNoClick: function () {
                    client.emit("second_player_response", false);
                    this.close();
                }
            });
        });

        client.on("first_player_lost", function () {
            self.timerOneReset();
            self.timerTwoReset();

            memo.gui.dialog("information", "Przegrałeś!", {
                onOkClick: function () {
                    this.close();
                }
            });
        });

        client.on("second_player_lost", function () {
            self.timerOneReset();
            self.timerTwoReset();

            memo.gui.dialog("information", "Przegrałeś!", {
                onOkClick: function () {
                    this.close();
                }
            });
        });

        client.on("exit", function () {
            window.location.reload();
        });

        client.on("timer1_update", function (time) {
            var timer = memo.gui.get("firstTimer");
            timer.update(time);
        });

        client.on("timer1_end", function (time) {
            var timer = memo.gui.get("firstTimer");
            timer.clear();

            client.emit("timer1_reset");
        });

        client.on("timer2_update", function (time) {
            var timer = memo.gui.get("secondTimer");
            timer.update(time);
        });

        client.on("timer2_end", function (time) {
            var timer = memo.gui.get("secondTimer");
            timer.clear();

            client.emit("timer2_reset");
        });

        ///

        client.on("update_info_bar", function (firstPlayer, secondPlayer) {
            console.log(firstPlayer, secondPlayer);

            if (firstPlayer !== null)
                memo.gui.firstPlayerData(firstPlayer.nickname, firstPlayer.score, firstPlayer.ranking);
            else
                memo.gui.firstPlayerData("-", "-", "-");

            if (secondPlayer !== null)
                memo.gui.secondPlayerData(secondPlayer.nickname, secondPlayer.score, secondPlayer.ranking);
            else
                memo.gui.secondPlayerData("-", "-", "-");
        });

        client.on("start_game", function (board) {
            memo.startGame(board);
        });

        client.on("you_turn", function (player) {
            if (player == 1) {
                self.timerTwoReset();
                self.timerOneReset();
                self.timerOneStart();
            }
            else if (player == 2) {
                self.timerOneReset();
                self.timerTwoReset();
                self.timerTwoStart();
            }

            memo.canMakeMove = true;
            memo.gui.tip("Twój ruch!");
            client.emit("get_info_bar");
        });

        client.on("not_you_turn", function () {
            memo.canMakeMove = false;
            memo.gui.tip("Gra przeciwnik");
            client.emit("get_info_bar");
        });

        client.on("discover", function (name) {
            animationCard(name, function () { });
        });

        client.on("success_exposure", function (name1, name2) {
            successExposure(name1, name2);
        });

        client.on("fail_exposure", function (name1, name2) {
            failExposure(name1, name2);
        });

        client.on("lose_turn", function () {
            if (!memo.isCheckingCards) {
                //TODO emit powracajacy to pole u drugiego
                if (memo.firstCard != null)
                    client.emit("lose_turn2", memo.firstCard.name);

                loseTurn(memo.firstCard.name);
                resetKeyboardIlluminate(startPositionX, startPositionZ);
                resetStatistics();
            }
        });

        client.on("lose_turn2", function (name) {
            loseTurn(name);
            resetStatistics();
        });
    }

    construct();

    this.login = function (nickname, password) {
        client.emit("login", nickname, password);
    }

    this.register = function (nickname, password) {
        client.emit("register", nickname, password);
    }

    this.getRanking = function () {
        client.emit("get_ranking");
    }

    this.timerOneStart = function () {
        client.emit("timer1_start");
    }

    this.timerOneStop = function () {
        client.emit("timer1_stop");
    }

    this.timerOneContinue = function () {
        client.emit("timer1_continue");
    }

    this.timerOneReset = function () {
        client.emit("timer1_reset");
    }

    this.timerTwoStart = function () {
        client.emit("timer2_start");
    }

    this.timerTwoStop = function () {
        client.emit("timer2_stop");
    }

    this.timerTwoContinue = function () {
        client.emit("timer2_continue");
    }

    this.timerTwoReset = function () {
        client.emit("timer2_reset");
    }
}