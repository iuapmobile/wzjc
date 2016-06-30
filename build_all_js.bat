@echo off
echo 开始运行
title=auto build dsl&web ...

::set target1=..\..\gityy\publibs\resources\designer\templates\system\webtemplates\frametemplate\ump\projects\default\js
copy src\script\summer.js ..\..\gityy\publibs\resources\designer\templates\system\webtemplates\frametemplate\ump\projects\default\js /y
copy src\script\summer.js ..\..\gityy\publibs\resources\designer\templates\system\webtemplates\frametemplate\ratchet\projects\default\js /y
copy src\script\summer.js ..\..\gityy\publibs\resources\designer\templates\system\webtemplates\files\js /y
echo  复制summer.js完毕......ok 
pause