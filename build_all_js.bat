@echo off
echo 开始运行
title=auto build dsl&web ...

::set target1=..\..\gityy\publibs\resources\designer\templates\system\webtemplates\frametemplate\ump\projects\default\js
copy ..\summer\dist\js\summer.js src\script\ /y
copy ..\summer\dist\js\summer.min.js src\script\ /y
echo  复制summer.js完毕......ok 
pause