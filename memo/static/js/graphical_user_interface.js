function GraphicalUserInterface() {
    var self = this;

    var board = document.createElement("div");
    var startScreen = document.createElement("div");
    var dialog = document.createElement("div");
    var text = document.createElement("div");
    var tip = document.createElement("div");
    var infoBar = document.createElement("div");
    var firstTimer = new Timer();
    var firstNickname = document.createElement("div");
    var firstScore = document.createElement("div");
    var firstRanking = document.createElement("div");
    var secondTimer = new Timer();
    var secondNickname = document.createElement("div");
    var secondScore = document.createElement("div");
    var secondRanking = document.createElement("div");
    var sidePanel = document.createElement("div");
    var sidePanelToggleButton = document.createElement("div");
    var sidePanelBookmarks = document.createElement("div");
    var sidePanelPlayingList = document.createElement("ul");
    var sidePanelQueueList = document.createElement("ul");
    var sidePanelRankingList = document.createElement("ul");
    var helpBox = document.createElement("div");

    var dialogCallbacks = {
        close: function () {
            dialog.classList.add("hidden");
        }
    };

    var timeouts = [];

    function construct() {
        /*v - BOARD - v*/

        board.style.display = "none";
        board.style.position = "fixed";

        /*^ - BOARD - ^*/

        /*v - STARTSCREEN - v*/

        startScreen.id = "start_screen";

        ////

        var loginPanel = document.createElement("div");
        loginPanel.id = "login_panel";

        startScreen.appendChild(loginPanel);

        ///

        var nicknameInput = document.createElement("input");
        nicknameInput.className = "user_input";
        nicknameInput.type = "text";
        nicknameInput.autofocus = true;
        nicknameInput.placeholder = "Nazwa użytkownika";

        loginPanel.appendChild(nicknameInput);

        //

        var passwordInput = document.createElement("input");
        passwordInput.className = "user_input";
        passwordInput.type = "password";
        passwordInput.placeholder = "Hasło";

        loginPanel.appendChild(passwordInput);

        //

        var loginButton = document.createElement("input");
        loginButton.className = "user_button";
        loginButton.type = "button";
        loginButton.value = "Zaloguj";

        loginButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            var nickname = nicknameInput.value;
            var password = passwordInput.value;

            if (nickname.length > 18 || nickname.length < 2)
                self.dialog("information", "Zła długość nazwy użytkownika<br>\n(od 2 do 18 znaków)", {
                    onOkClick: function () {
                        this.close()
                    }
                });
            else if (password.length > 24 || password.length < 4)
                self.dialog("information", "Zła długość hasła<br>\n(od 4 do 24 znaków)", {
                    onOkClick: function () {
                        this.close()
                    }
                });
            else
                memo.net.login(nickname, password);
        });

        nicknameInput.addEventListener("keyup", keyUpLogin);
        passwordInput.addEventListener("keyup", keyUpLogin);

        function keyUpLogin(e) {
            if (e.which != 13) return;

            loginButton.click();
        }

        loginPanel.appendChild(loginButton);

        //

        var registerButton = document.createElement("input");
        registerButton.className = "user_button";
        registerButton.type = "button";
        registerButton.value = "Zarejestruj";

        registerButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            var nickname = nicknameInput.value;
            var password = passwordInput.value;

            if (nickname.length > 18 || nickname.length < 2)
                self.dialog("information", "Zła długość nazwy użytkownika<br>\n(od 2 do 18 znaków)", {
                    onOkClick: function () {
                        this.close()
                    }
                });
            else if (password.length > 24 || password.length < 4)
                self.dialog("information", "Zła długość hasła<br>\n(od 4 do 24 znaków)", {
                    onOkClick: function () {
                        this.close()
                    }
                });
            else
                memo.net.register(nickname, password);
        });

        loginPanel.appendChild(registerButton);

        /*^ - STARTSCREEN - ^*/

        /*v - DIALOG - v*/

        dialog.id = "dialog";
        dialog.className = "hidden";

        var innerDialog = document.createElement("div");
        dialog.appendChild(innerDialog);

        ///

        text.id = "dialog_text";

        innerDialog.appendChild(text);

        //

        var buttonsBar = document.createElement("div");
        buttonsBar.id = "dialog_buttons_bar";

        innerDialog.appendChild(buttonsBar);

        ///

        var okButton = document.createElement("button");
        okButton.className = "type_information";
        okButton.innerText = "Ok";

        okButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            dialogCallbacks.onOkClick();
        });

        buttonsBar.appendChild(okButton);

        ///

        var yesButton = document.createElement("button");
        yesButton.className = "type_question";
        yesButton.innerText = "Tak";

        yesButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            dialogCallbacks.onYesClick();
        });

        buttonsBar.appendChild(yesButton);

        //

        var noButton = document.createElement("button");
        noButton.className = "type_question";
        noButton.innerText = "Nie";

        noButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            dialogCallbacks.onNoClick();
        });

        buttonsBar.appendChild(noButton);


        /*^ - DIALOG - ^*/

        /*v - TIP - v*/

        tip.id = "tip";
        tip.className = "hidden";

        //

        var tipText = document.createElement("div");

        tip.appendChild(tipText);

        /*^ - TIP - ^*/

        /*v - INFOBAR - v*/

        infoBar.id = "info_bar";

        ////

        var infoBarFirst = document.createElement("div");
        infoBarFirst.id = "info_bar_first";
        infoBarFirst.className = "player_info";

        infoBar.appendChild(infoBarFirst);

        //

        infoBarFirst.appendChild(firstTimer.getTimer());
        firstTimer.update(0);

        //

        firstNickname.className = "info_bar_nickname";
        firstNickname.innerText = "-";

        infoBarFirst.appendChild(firstNickname);

        //

        firstScore.className = "info_bar_score";
        firstScore.innerText = "-";

        infoBarFirst.appendChild(firstScore);

        //

        firstRanking.className = "info_bar_ranking";
        firstRanking.innerText = "-";

        infoBarFirst.appendChild(firstRanking);

        /////

        var infoBarSecond = document.createElement("div");
        infoBarSecond.id = "info_bar_second";
        infoBarSecond.className = "player_info";

        infoBar.appendChild(infoBarSecond);

        //

        infoBarSecond.appendChild(secondTimer.getTimer());
        secondTimer.update(0);

        //

        secondNickname.className = "info_bar_nickname";
        secondNickname.innerText = "-";

        infoBarSecond.appendChild(secondNickname);

        //

        secondScore.className = "info_bar_score";
        secondScore.innerText = "-";

        infoBarSecond.appendChild(secondScore);

        //

        secondRanking.className = "info_bar_ranking";
        secondRanking.innerText = "-";

        infoBarSecond.appendChild(secondRanking);

        /*^ - INFOBAR - ^*/

        /*v - SIDEPANEL - v*/

        sidePanel.id = "side_panel";

        /////

        sidePanelToggleButton.id = "side_panel_toggle_button";

        sidePanelToggleButton.addEventListener("click", function (e) {
            if (e.button != 0) return;

            sidePanelToggleButton.classList.toggle("hidden");
            sidePanel.classList.toggle("hidden");
        });

        sidePanel.appendChild(sidePanelToggleButton);

        /////

        sidePanelBookmarks.id = "side_panel_bookmarks";

        sidePanel.appendChild(sidePanelBookmarks);

        /////

        var sidePanelPlayersBookmark = document.createElement("div");
        sidePanelPlayersBookmark.id = "side_panel_players_bookmark";
        sidePanelPlayersBookmark.className = "side_panel_bookmark";

        sidePanelPlayersBookmark.addEventListener("click", function (e) {
            if (e.button != 0) return;

            sidePanelRankingBookmark.classList.add("hidden");
            sidePanelPlayersBookmark.classList.remove("hidden");

            sidePanelRanking.classList.add("hidden");
            sidePanelPlayers.classList.remove("hidden");
        });

        sidePanelBookmarks.appendChild(sidePanelPlayersBookmark);

        var sidePanelRankingBookmark = document.createElement("div");
        sidePanelRankingBookmark.id = "side_panel_ranking_bookmark";
        sidePanelRankingBookmark.className = "side_panel_bookmark hidden";

        sidePanelRankingBookmark.addEventListener("click", function (e) {
            if (e.button != 0) return;

            sidePanelPlayersBookmark.classList.add("hidden");
            sidePanelRankingBookmark.classList.remove("hidden");

            sidePanelPlayers.classList.add("hidden");
            sidePanelRanking.classList.remove("hidden");
        });

        sidePanelBookmarks.appendChild(sidePanelRankingBookmark);

        /////

        var sidePanelPlayers = document.createElement("div");
        sidePanelPlayers.id = "side_panel_players";
        sidePanelPlayers.className = "side_panel";

        sidePanel.appendChild(sidePanelPlayers);

        ///

        var sidePanelPlayingOuter = document.createElement("div");
        sidePanelPlayingOuter.className = "side_panel_outer";

        sidePanelPlayers.appendChild(sidePanelPlayingOuter);

        var sidePanelPlayingTitle = document.createElement("h1");
        sidePanelPlayingTitle.innerHTML = "Teraz grają";

        sidePanelPlayingOuter.appendChild(sidePanelPlayingTitle);

        //

        sidePanelPlayingList.className = "side_panel_playing_list";

        var firstPlayer = document.createElement("li");
        firstPlayer.className = "player_item";
        firstPlayer.innerHTML = "Gracz pierwszy";

        var secondPlayer = document.createElement("li");
        secondPlayer.className = "player_item";
        secondPlayer.style.borderBottom = "none";
        secondPlayer.innerHTML = "Gracz drugi";

        sidePanelPlayingList.appendChild(firstPlayer);
        sidePanelPlayingList.appendChild(secondPlayer);

        sidePanelPlayingOuter.appendChild(sidePanelPlayingList);

        ///

        var sidePanelQueueOuter = document.createElement("div");
        sidePanelQueueOuter.className = "side_panel_outer";

        sidePanelPlayers.appendChild(sidePanelQueueOuter);

        var sidePanelQueueTitle = document.createElement("h1");
        sidePanelQueueTitle.innerHTML = "W kolejce";

        sidePanelQueueOuter.appendChild(sidePanelQueueTitle);
        sidePanelQueueOuter.appendChild(sidePanelQueueList);

        //

        sidePanelQueueList.className = "side_panel_queue_list";

        sidePanelQueueOuter.appendChild(sidePanelQueueList);

        /////

        var sidePanelRanking = document.createElement("div");
        sidePanelRanking.id = "side_panel_ranking";
        sidePanelRanking.className = "side_panel hidden";

        sidePanel.appendChild(sidePanelRanking);

        ///

        var sidePanelRankingOuter = document.createElement("div");
        sidePanelRankingOuter.className = "side_panel_outer";

        sidePanelRanking.appendChild(sidePanelRankingOuter);

        var sidePanelRankingTitle = document.createElement("h1");
        sidePanelRankingTitle.innerHTML = "Ranking";

        sidePanelRankingOuter.appendChild(sidePanelRankingTitle);
        sidePanelRankingOuter.appendChild(sidePanelRankingList);

        //

        sidePanelRankingList.className = "side_panel_ranking_list";

        for (var i = 0; i < 100; i++) {
            var item = document.createElement("li");
            item.className = "player_item";
            item.innerHTML = "player_item " + i;

            if (i == 99)
                item.style.borderBottom = "none";

            sidePanelRankingList.appendChild(item);
        }

        sidePanelRankingOuter.appendChild(sidePanelRankingList);

        /*^ - SIDEPANEL - ^*/

        /*v - HELPBOX - v*/

        helpBox.id = "help_box";
        helpBox.className = "hidden";

        helpBox.addEventListener("click", function (e) {
            if (e.button != 0) return;

            helpBox.classList.toggle("hidden");
        });

        var helpBoxText = document.createElement("div");

        helpBoxText.innerHTML =
            "<strong>Sterowanie:</strong><br>\n" +
            "<strong>H</strong> - pokaż/ukryj okno pomocy<br>\n" +
            "<strong>P</strong> - pokaż/ukryj panel boczny<br>\n" +
            "<strong>R</strong> - widok gracze/ranking<br>\n" +
            "<strong>Strzałki, mysz</strong> - wybierz kartę<br>\n" +
            "<strong>Enter, LPM</strong> - odkryj kartę";

        helpBox.appendChild(helpBoxText);

        /*^ - HELPBOX - ^*/
    }

    construct();

    this.setPlayers = function (playerOne, playerTwo) {
        sidePanelPlayingList.children[0].innerHTML = playerOne;

        if (playerTwo === undefined)
            sidePanelPlayingList.children[1].innerHTML = "";
        else
            sidePanelPlayingList.children[1].innerHTML = playerTwo;
    }

    this.makeQueue = function (players) {
        sidePanelQueueList.innerHTML = "";

        for (var i in players) {
            var playerItem = document.createElement("li");
            playerItem.className = "player_item";
            playerItem.innerHTML = players[i];

            if (players.length > 11 && i == players.length - 1)
                playerItem.style.borderBottom = "none";

            sidePanelQueueList.appendChild(playerItem);
        }
    }

    this.makeRanking = function (players) {
        sidePanelRankingList.innerHTML = "";

        for (var i in players) {
            var playerItem = document.createElement("li");
            playerItem.className = "player_item";

            if (players.length > 14 && i == players.length - 1)
                playerItem.style.borderBottom = "none";

            var position = document.createElement("span");
            var nickname = document.createElement("span");
            var score = document.createElement("span");

            position.innerHTML = (parseInt(i) + 1) + ".";
            nickname.innerHTML = players[i].nickname;
            score.innerHTML = players[i].score;

            playerItem.appendChild(position);
            playerItem.appendChild(nickname);
            playerItem.appendChild(score);

            sidePanelRankingList.appendChild(playerItem);
        }
    }

    this.switchBookmark = function () {
        if (sidePanelBookmarks.children[0].classList.contains("hidden"))
            sidePanelBookmarks.children[0].click();
        else
            sidePanelBookmarks.children[1].click();
    }

    this.dialog = function (type, message, callbacks) {
        switch (type) {
            case "information":
                dialog.classList.add("information");
                dialog.classList.remove("hidden");

                dialog.children[0].children[1].children[0].focus();

                text.innerHTML = message;

                dialogCallbacks.onOkClick = callbacks.onOkClick;

                break;

            case "question":
                dialog.classList.add("question");
                dialog.classList.remove("hidden");

                dialog.children[0].children[1].children[1].focus();

                text.innerHTML = message;

                dialogCallbacks.onYesClick = callbacks.onYesClick;
                dialogCallbacks.onNoClick = callbacks.onNoClick;

                break;
        }
    }

    this.tip = function (message) {
        for (var i in timeouts)
            clearTimeout(timeouts[i]);

        tip.children[0].innerHTML = message;
        tip.style.display = "flex";
        tip.classList.remove("hidden");

        timeouts[0] = setTimeout(function () {
            tip.classList.add("hidden");

            timeouts[1] = setTimeout(function () {
                tip.style.display = "none";
            }, 1000);
        }, 3000);
    }

    this.firstPlayerData = function (nickname, score, ranking) {
        firstNickname.innerText = nickname;
        firstScore.innerText = score;
        firstRanking.innerText = ranking;
    }

    this.secondPlayerData = function (nickname, score, ranking) {
        secondNickname.innerText = nickname;
        secondScore.innerText = score;
        secondRanking.innerText = ranking;
    }

    this.get = function (node) {
        return eval(node);
    }
}