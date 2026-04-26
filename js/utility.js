define([
    'stage'
], function(Stage) {


    var Utility = {
        pointDistance: function(x1, y1, x2, y2) {
            return Math.sqrt((y2 - y1) * (y2 - y1) + (x2 - x1) *
                (x2 - x1));
        },
        pointIsCloseEnough: function(x1, y1, x2, y2, dist) {
            return Math.abs(y2 - y1)<=dist && Math.abs(x2 - x1)<=dist ;
        },
        pointDirection: function(x1, y1, x2, y2) {
            return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
        },
        /**
         *	vectorSum(vectorA,vectorB)
         *
         *	@param vectorA object in the form {dir,mag} denoting direction
         *		and magnitude of the first vector
         *	@param vectorB same as vectorA
         */
        vectorSum: function(vA, vB) {
            var ax, ay;
            var bx, by;
            var rx, ry;
            ax = Math.cos(vA.dir / 180 * Math.PI) * vA.mag;
            ay = Math.sin(vA.dir / 180 * Math.PI) * vA.mag;
            bx = Math.cos(vB.dir / 180 * Math.PI) * vB.mag;
            by = Math.sin(vB.dir / 180 * Math.PI) * vB.mag;
            rx = ax + bx;
            ry = ay + by;
            var newDir = Math.atan2(ry, rx) / Math.PI * 180;
            var newMag = Math.sqrt(rx * rx + ry * ry);
            return {
                dir: newDir,
                mag: newMag
            };
        },

        getMouse: function(event) {
            var sourceEvent = event.originalEvent || event;
            var point = sourceEvent;
            if (sourceEvent.changedTouches && sourceEvent.changedTouches.length > 0) {
                point = sourceEvent.changedTouches[0];
            } else if (sourceEvent.touches && sourceEvent.touches.length > 0) {
                point = sourceEvent.touches[0];
            }

            var canvas = document.getElementById('game-canvas');
            var rect = canvas.getBoundingClientRect();
            var scaleX = Stage.width / rect.width;
            var scaleY = Stage.height / rect.height;
            var mx = (point.clientX - rect.left) * scaleX;
            var my = (point.clientY - rect.top) * scaleY;
            return {
                x: mx,
                y: my
            };
        },

        /**
         * easeOutCubic function
         * @param {number} t time elapsed
         * @param {number} b start
         * @param {number} c delta
         * @param {number} d duration
         */
        easeOutCubic: function(t, b, c, d) {
            t /= d;
            t--;
            return c * (t * t * t + 1) + b;
        },

        createCookie: function(key, value, days) {
            var expires;

            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + expires + "; path=/";

           //console.log("document.cookie: "+ document.cookie);
        },
        readCookie: function(key) {
            var nameEQ = encodeURIComponent(key) + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
            return null;
        },
        eraseCookie: function(key) {
            createCookie(key, "", -1);
        }
    };

    return Utility;
});
