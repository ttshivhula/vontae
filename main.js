$(function () {
	var		currentCmd, content, current = 0, pwd = "~";

	var		cmds = [
		{
			cmd: "ls",
			result: "<span class='folder'>Videos</span><span class='file'> vontae.jpg</span>"
		},
		{
			cmd: "./server",
			result: "zsh: no such file or directory: ./server"
		},
		{
			cmd: "mkdir server",
		},
		{
			cmd: "cd server",
			pwd: "~/server"
		},
		{
			cmd: "ls",
			result: "<span class='folder'>server</span>"
		},
		{
			cmd: "cp ../vontae.jpg ."
		},
		{
			cmd: "vim main.c",
			callback: vim,
			result: "[1]  + 9602 suspended  vim main.c\n(pwd now: ~/server)"
		},
		{
			cmd: "gcc main.c -o server"
		},
		{
			cmd: "ls",
			result: "main.c vontae.jpg <span style='color: rgb(98, 227, 98)'>server</span>"
		},
		{
			cmd: "touch index.html",
		},
		{
			cmd: "./server &",
			result: "[2] 19908"
		},
		{
			cmd: "fg",
			callback: re_vim
		},
		{
			cmd: "exit",
			callback: function() {
				$(".preview").animate({"width": "100%"}, 1000);
				$("#skip").hide();
				$(".lines").remove();
			}
		}
	];

	function		command() {
		$(".typed-cursor").remove();
		content.find("#content").typed({
			strings: [cmds[current].cmd],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			callback: result,
			contentType: 'text'
		});
	}

	function		result() {
		if (cmds[current].callback != undefined) {
			cmds[current].callback();
			return ;
		}
		else if (cmds[current].result != undefined)
			content.find("#result").append(cmds[current].result);
		current++;
		main();
	}

	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || $(window).width() <= 768) {
		skip();
	} else {
		$(".lines").html("1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11<br />12<br />13<br />14<br />15<br />16<br />17<br />18<br />19<br />20<br />21<br />22<br />23<br />24<br />25<br />26<br />27<br />28<br />29<br />30<br />31<br />32<br />33<br />34<br />35<br />36<br />37<br />38<br />39<br />40<br />41<br />42<br />43<br />44<br />45<br />46<br />47<br />48<br />49<br />50<br />51<br />52<br />53<br />54<br />55<br />56<br />57<br />58<br />59<br />60<br />61<br />62<br />63<br />64<br />65<br />66<br />67<br />68<br />69<br />70");
		$(".tmp").typed({
			strings: ["^1000Uh.\n^1000Website ?\n^500Please ?\n^2000*sigh*\n^500All right, let's make this work.^500\n/clear\n"],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			contentType: 'text',
			callback: function() {
				$(".tmp").remove();
				main();
			}
		});
	}

	function		main() {
		$(".console").append("<div class='command-"+ current +"'>" + $(".vanilla").html() + "</div>");
		content = $(".command-"+ current);
		$(".typed-cursor").remove();
		content.find("#content").append("<span class=\"typed-cursor\">▊</span>");
		content.find(".pwd").html(pwd);
		if (cmds[current] != undefined) {
			if (cmds[current].pwd != undefined)
				pwd = cmds[current].pwd;
			setTimeout(command, 500);
		}
	}

	function		vim() {
		$(".console").hide();
		$(".vim").show();
		$(".vim .st").removeClass("normal");
		$(".vim .st").addClass("insert");
		$(".vim .st").html("INSERT");
		$(".vim #content").typed({
			strings: [res.value],
			typeSpeed: -100,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .st").removeClass("insert");
				$(".vim .st").addClass("normal");
				$(".vim .st").html("NORMAL");
				$(".vim .cmd").typed({
					strings: [":w"],
					typeSpeed: 0,
					showCursor: true,
					cursorChar: '▊',
					startDelay: 1000,
					callback: function() {
						$(".typed-cursor").remove();
						setTimeout(closeVim, 3000);
					}
				});
			}
		});
	}

	function	closeVim() {
		$(".vim").hide();
		$(".console").show();
		content.find("#result").append(cmds[current].result);
		current++;
		main();
	}

	function	re_vim() {
		$(".console").hide();
		$(".vim .cmd").html("");
		$(".vim").show();
		$(".vim .cmd").typed({
			strings: [":e index.html"],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .menu").html("<span style=\"color: green\"> 1</span>+ index.html");
				$(".vim .status .fd").html("index.html");
				$(".vim .status .infos").html("unix | utf-8 | HTML");
				$(".vim .file #content").html("");
				$(".vim .cmd").html("");
				$(".typed-cursor").remove();
				$(".vim .st").removeClass("normal");
				$(".vim .st").addClass("insert");
				$(".vim .st").html("INSERT");

				website();
			}
		});
	}

	function website() {
		$(".vim #content").typed({
			strings: html,
			typeSpeed: -50,
			showCursor: true,
			cursorChar: '▊',
			callback: function() {
				$(".vim").animate({"width": "70%"}, 1000);
				$(".vim .status").animate({"width": "70%"}, 1000);
				$(".vim .infos").animate({"right": "30%"}, 1000, function() {
					$(".preview").show();
					$(".preview").html(o_html);
					$(".vim .file").append('<span id="content2" style="white-space:pre"></span>');
					$(".typed-cursor").remove();
					$(".vim #content2").typed({
						strings: html2,
						typeSpeed: 0,
						showCursor: true,
						cursorChar: '▊',
						callback: function() {
							$(".vim .st").removeClass("insert");
							$(".vim .st").addClass("normal");
							$(".vim .st").html("NORMAL");
							style();
						}});
				});
			}
		});
	}

	function	style() {
		$(".vim .cmd").typed({
			strings: [":e style.css"],
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".vim .menu").html("<span style=\"color: green\"> 1</span>+ style.css");
				$(".vim .status .fd").html("style.css");
				$(".vim .status .infos").html("unix | utf-8 | CSS");
				$(".vim .file #content").html("");
				$(".vim .file #content2").html("");
				$(".vim .cmd").html("");
				$(".typed-cursor").remove();
				$(".vim .st").removeClass("normal");
				$(".vim .st").addClass("insert");
				$(".vim .st").html("INSERT");
				write_style();
			}
		});
	}

	function 	write_style() {
		$(".vim #content").typed({
			strings: css1,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".preview").css({
					"text-align": "center",
					"background": "#101010",
					"color": "#98971a",
					"font-family": "Open Sans",
					"font-size": "1.3em"
				});
				$(".typed-cursor").remove();
				setTimeout(write_style_2, 1000);
			}
		});
	}

	function write_style_2() {
		$(".vim #content2").typed({
			strings: css2,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			startDelay: 1000,
			callback: function() {
				$(".preview h1").css({
					"margin-top": "1%",
					"margin-bottom": "1%",
					"font-size": "3.5em"
				});
				$(".preview a").css({
					"text-decoration": "none",
					"color": "#ffffff",
					"transition-property": "all",
					"transition-duration": "0.3s"
				});
				$(".preview a i").css({
					"font-size": "2em",
					"margin-right": "1%",
					"margin-left": "1%"
				});
				$("img").css({
					"margin-top": "5%",
					"margin-bottom": "1%",
					"border-radius": "50%",
					"width": "30vh",
				});
				setTimeout(done, 2000);
			}
		});
	}

	function	done() {
		$(".typed-cursor").remove();
		$(".vim .file").append('<span id="content3" style="white-space:pre"></span>');
		$(".vim #content3").typed({
			strings: css3,
			typeSpeed: 0,
			showCursor: true,
			cursorChar: '▊',
			callback: function() {
				$(".vim .st").removeClass("insert");
				$(".vim .st").addClass("normal");
				$(".vim .st").html("NORMAL");
				$(".vim .cmd").typed({
					strings: [":wq"],
					typeSpeed: 0,
					showCursor: true,
					cursorChar: '▊',
					startDelay: 1000,
					callback: function() {
						$(".typed-cursor").remove();
						setTimeout(closeVim, 1000);
					}
				});

			}
		});
	}

	function	skip() {
		$(".preview").html(o_html);
		$(".preview h1").css({
			"margin-top": "1%",
			"margin-bottom": "1%",
			"font-size": "3.5em"
		});
		$(".preview a").css({
			"text-decoration": "none",
			"color": "#ffffff",
			"transition-property": "all",
			"transition-duration": "0.3s"
		});
		$(".preview a i").css({
			"font-size": "2em",
			"margin-right": "1%",
			"margin-left": "1%"
		});
		$(".preview").css({
				"text-align": "center",
				"background": "#101010",
				"color": "#98971a",
				"font-family": "Open Sans",
				"font-size": "1.3em"
		});
		$("img").css({
			"margin-top": "5%",
			"margin-bottom": "1%",
			"border-radius": "50%",
			"width": "30vh",
		});
		$("#skip").hide();
		$(".preview").show();
		$(".preview").animate({"width": "100%"}, 1000);
		$(".lines").remove();
	}

	$("#skip").on('click', function() {
		skip();
		$("#skip").hide();
	});

	hljs.configure({
		languages:["C", "HTML", "CSS"]
	});
	var res = hljs.highlight("C", file);
	html[2] = hljs.highlight("HTML", html[2]).value;
	html2[0] = hljs.highlight("HTML", html2[0]).value;
	css1[0] = hljs.highlight("CSS", css1[0]).value;
	css2[0] = hljs.highlight("CSS", css2[0]).value;
	css3[0] = hljs.highlight("CSS", css3[0]).value;
});

var html = [
	"Phew, that's done.^500\nNow let's code the site.^1000",
	"Machine,^500\n\nPls make website,^500\n\nall responsive like,^500\nw/ BIG pictures ooo^500,\nuse my fav fonts^1000,\nalso fancy menus with whoosh on,^500\nload fast pls^200\n\nThanks,\nHuman\n\n^1500PS no bugs :)^500\n^500\n^500\n^1500.^1500.^1500.^2000\n\nDoesn't work?\n\n^1000Damnit.",
	'<!DOCTYPE HTML>\n<html lang="en">\n	<head>\n		<!-- CSS Declaration -->\n			<link href="http://fonts.googleapis.com/css?family=Open+Sans:300" rel="stylesheet" type="text/css">\n			<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">\n			<link href="style.css" rel="stylesheet">\n\n		<!-- JS import -->\n			<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>\n			<script src="js/script.js"></script>\n\n		<!-- META Declaration -->\n			<meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui">\n			<meta name="description" content="Another useless website.">\n			<meta name="author" content="Tshilidzi Tshivhula">\n			<meta name="keywords" content="Tshilidzi,Tshivhula,Systems Engineer">\n			<meta charset="utf-8">\n			<title>Vontae - Tshilidzi Tshivhula</title>\n	</head>\n	<body>\n		<img src="vontae.jpg"/>\n		<div id="contact">\n			<h1>Tshilidzi</h1>\n			<a href="http://blog.vontae.co.za"><i class="fas fa-blog"></i></a>\n			<a href="https://github.com/ttshivhula"><i class="fab fa-git"></i></a>\n			<a href="http://twitter.com/pboyfunclub"><i class="fab fa-twitter"></i></a>\n			<a href="vontae-cv.pdf"><i class="fas fa-file-pdf"></i></a><br /><br />\n			<a class="mail" href="mailto:tshilidzi@vontae.co.za">tshilidzi@vontae.co.za</a>\n			<a class="mail" href="tel:+27606400470"><i class="fa fa-phone little"></i>  +2760 640 0470</a>\n		</div>\n	</body>\n</html>\n<!-- ^^^^^ Website of the year. ^^^^^^ ^2000-->\n<!-- Wait, you can\'t see it ! ^500-->\n<!-- Give me a minute ... -->'
];

var html2 = ["\n<!-- Muuuuch better. ^2000What a beautiful site. ^1500Could use some more style though. -->"];

var o_html = '<img src="vontae.jpg" width="40vh"/><h1><span class="small-title">Tshilidzi</span> Tshivhula</h1><a href="http://212.47.226.107"><i class="fas fa-blog"></i></a><a href="https://github.com/ttshivhula"><i class="fab fa-git"></i></a><a href="http://twitter.com/pboyfunclub"><i class="fab fa-twitter"></i></a><a href="vontae-cv.pdf"><i class="fas fa-file-pdf"></i></a><br /><br /><a class="mail" href="mailto:tshilidzi@vontae.co.za"><i class="fa fa-envelope little"></i>tshilidzi@vontae.co.za</a><br /><a class="mail" href="tel:+27606400470"><i class="fa fa-phone little"></i> +2760 640 0470</a><br />';

var file = '/* Basic C Linux (UNIX) Web Server */\n\n#include <netinet/in.h>\n#include <sys/socket.h>\n#include <sys/stat.h>\n#include <sys/sendfile.h>\n#include <sys/types.h>\n#include <unistd.h>\n#include <stdlib.h>\n#include <fcntl.h>\n#include <stdio.h>\n#include <string.h>\n\nint		main(void) {\n	int				c_sock, n_sock, bufsize = 1024, fd;\n	socklen_t			addrlen;\n	char				*buffer = malloc(bufsize * sizeof(char)), str[65];\n	struct sockaddr_in		addr;\n	struct stat			stat_buf;\n\n	if ((c_sock = socket(AF_INET, SOCK_STREAM, 0)) == -1 || !buffer) { return 1; }\n	addr.sin_family = AF_INET; addr.sin_addr.s_addr = INADDR_ANY; addr.sin_port = htons(80);\n	if (bind(c_sock, (struct sockaddr *)&addr, sizeof(addr)) != 0) { return 1; }\n	while (1) {\n		if (listen(c_sock, 10) < 0) { return 1; }\n		fd = open("index.html", O_RDONLY);\n		if ((n_sock = accept(c_sock, (struct sockaddr *)&addr, &addrlen)) < 0 || fd == -1) { return 1; }\n		recv(n_sock, buffer, bufsize, 0);\n		fstat(fd, &stat_buf);\n		sprintf(str, "HTTP/1.1 200 OK\\nContent-length: %d\\nContent-type: text/html\\n\\n", stat_buf.st_size);\n		write(n_sock, str, strlen(str));\n		if (sendfile(n_sock, fd, NULL, stat_buf.st_size) == -1) { return 1; }\n		close(n_sock);\n		close(fd);\n	}\n	close(c_sock);\n	free(buffer);\n	return 0;\n}';

var css1 = ["/* Let's do some design work */\n\n\nhtml {\n	text-align: center;\n	background: #101010;\n	color: #98971a;\n	font-family: 'Open Sans', sans-serif;\n	font-size: 1.3em;\n}\n"];

var css2 = ["/* Not so bad. Let's make a few changes. */\n\nh1 {\n	margin-top: 1%;\n	margin-bottom: 1%;\n	font-size: 3.5em;\n}\n\na {\n	text-decoration: none;\n	color: #ffffff;\n	transition-property: all;\n	transition-duration: 0.3s;\n}\n\na:hover {\n	color: #DC3522;\n}\n\na i {\n	font-size: 2em;\n	margin-right: 1%;\n	margin-left: 1%;\n}\nimg {\n	margin-top: 5%;\n	border-radius: 50%;\n	width: 30vh;\n}"];

var css3 = ["\n/* Well, we're done. Till' next refresh, see you. */"];
