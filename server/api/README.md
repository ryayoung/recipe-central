<!-- Maintainer:     Ryan Young -->
<!-- Last Modified:  Feb 21, 2022 -->
<a name="top"></a>

# Here is some of my work


[<img src="Buttons/SVG/graphic design.svg" height="35"/>](#graphicdesign)
[<img src="Buttons/SVG/sql database.svg" height="35"/>](#database)
[<img src="Buttons/SVG/java projects.svg" height="35"/>](#java)
[<img src="Buttons/SVG/python projects.svg" height="35"/>](#python)
[<img src="Buttons/SVG/vb.net.svg" height="35"/>](#vb)
[<img src="Buttons/SVG/vim.svg" height="35"/>](#vim)
[<img src="Buttons/SVG/github markdown.svg" height="35"/>](#markdown)
[<img src="Buttons/SVG/bottom of page.svg" height="35"/>](#bottom)
<br>

## A quick UI demo

This is a VB.NET application I made that communicates with an OLTP database.
<br>***This video is just a UI demonstration.*** For a walkthrough of the project, see the [SQL Database](#database) section.
<br>(Unmute for narration)<br>

https://user-images.githubusercontent.com/90723578/136682515-562cd1b8-dd9e-44ce-88bb-776dd553bf5a.mp4

<hr>

<a name="graphicdesign"></a>
<br><br>
# Graphic Design 
[<img src="Buttons/SVG/see more graphic design.svg" height="34" width="auto"/>](GraphicDesign/README.md/#top)
<hr>

## Select one...

<table>
  <tr>
    <th><b>Infographic</b></th>
    <th><b>App Prototype</b></th>
  </tr>
  <tr>
    <td><a href="GraphicDesign/Infographic.md/#top"><img src="Buttons/PNG/youtube infographic.png" height="240"/></a></td>
    <td><a href="GraphicDesign/MobileApp.md/#top"><img src="Buttons/PNG/alphanote.png" height="240"/></a></td>
  </tr>
  <tr>
    <th><b>Brand Guide</b></th>
    <th><b>Logo Design</b></th>
  </tr>
  <tr>
    <td><a href="GraphicDesign/BrandGuide.md/#top"><img src="Buttons/PNG/anode.png" height="240"/></a></td>
    <td><a href="GraphicDesign/LogoDesign.md/#top"><img src="Buttons/PNG/more than a word.png" height="240"/></a></td>
  </tr>
</table>


<hr>

<a name="database"></a>
<br><br>
# SQL Database Work 
[<img src="Buttons/SVG/see more sql database work.svg" height="34"/>](Database)
<hr>

## Karve Ski Demos

Karve is an online ski demo subscription for enthusiasts who always want the ideal gear for current snow conditions. Members have access to hundreds of skis at the touch of a button, delivered to their doorstep, with the freedom to swap products at any time with no additional cost.

To see how I populated this database with thousands of rows of realistic data by simulating normal and skewed distributions for customer measures based on gender, adding seasonality for consumer behavior, simulating ski damage patterns, and much more, see [Python Projects](#python).

Here is the diagram for Karve's OLTP database.

![image](https://user-images.githubusercontent.com/90723578/136710522-a44f98dc-d7bf-4756-89f2-b80a134231af.png)

#### For an in-depth walkthrough of this project, [see more SQL/Database work](Database)



<hr>

<a name="java"></a>
<br><br>
# Java Projects 
[<img src="Buttons/SVG/see more java projects.svg" height="34" width="auto"/>](JavaProjects)
<hr>

## Maze
This program randomly generates a unique maze, then solves it. Designed to run slowly in order to visualize what's going on, the pathfinder can recognize short dead-ends and avoid them. When the maze is complete, the path corrects itself, removing all dead-ends and revealing the shortest possible path to the finish line.

https://user-images.githubusercontent.com/90723578/136681997-f5c74bb6-6f57-4d3c-84cc-de1064729ad6.mp4






<hr>

<a name="python"></a>
<br><br>
# Python Projects 
[<img src="Buttons/SVG/see more python projects.svg" height="34" width="auto"/>](PythonProjects)
<hr>

## Generating Highly Realistic Data to Populate a Database
Nearly all of the data in the [Karve OLTP database](#database) above was generated using a series of lengthy Python scripts, but *very few* attributes are truly randomized.
#### The program must do the following:

1. Simulate real business patters
    * Create an order volume distribution that's bimodal, peaking in Dec. and Mar. Then, _based on time of season_, choose how the length of time customers keep skis for will be distributed. This is skewed right for most of the season, but shortens in the spring since all rentals _must_ be returned by July 7th.   
   * Choose how often skis get damaged, which types of damage are most common, how often multiple (2-3) damages occur in one rental event, how often a ski gets totaled/broken, and which types of critical damage are most common. And, when a ski does get totaled, update records to permanently prevent it from being rented again.

2. Simulate a realistic distribution for each measure and include dependencies
    * Pick what percent of customers are male/female.
    * Height will be normally distributed based on gender.
    * Weight will be based on height, and also normally distributed differently based on gender.
    * Boot size will be normally distributed based on gender.
    * Boot sole length will be based on boot size and then randomized within 3 millimeters.
    * Skier ability level will be slightly skewed towards advanced skiers
    * Days Used (# of days a customer _claims_ to have actually used the ski) will roughly correlate with the # of days between order and return date.

#### Here are a few histograms of the simulated data:

<table>
  <tr>
    <td><img src="https://github.com/ryayoung/data-warehousing/blob/main/KarveAutomation/plots/customer_weights.png" height="250" width="auto"></td>
    <td><img src="https://github.com/ryayoung/data-warehousing/blob/main/KarveAutomation/hist_days_kept.png" height="250" width="auto"></td>
  </tr>
</table>

<a name="vb"></a>
<br><br>
# VB.NET Application 
[<img src="Buttons/SVG/see the full project.svg" height="34"/>](VisualBasic)
<hr>

Description coming soon...
![sc_Search](https://user-images.githubusercontent.com/90723578/136726037-5e793725-719e-4475-a341-eea0211097c1.png)


<hr>

<a name="vim"></a>
<br><br>
# Vim Configuration & Plugins
[<img src="Buttons/SVG/see full vim configuration.svg" height="34" width="auto"/>](Vim)
<hr>

### Plugins
<hr>

### [vim-annotate-me](https://github.com/ryayoung/vim-annotate-me)
1. Lets you **toggle** comment/uncomment one or multiple lines of code at a time with a single keypress.
2. Recognizes your filetype and will comment/uncomment according to that syntax. Especially useful in languages such as HTML, where commented code must be fully enclosed, AND the syntax is annoying to type by hand. (Ex: ```<!-- some html stuff -->```).
3. Automatically creates headers (name & today's date) at the top of any new document you create, or any empty document that you open, and comments out that header using correct syntax based on your filetype.
4. Lets you toggle the current file's header on/off with a single keypress, without disrupting your code, and without moving your cursor from its relative position.
5. As soon as you write/save a file that HAS been modified, the header (if one exists) will be updated with the current date.
6. The header format is fully customizeable, including the format of the current date. If you change the date format in your vimrc, the old dates in your previous files will automatically update with the new format once you save/write to them again.

### Maps
<hr>

### Quick Marks: Quickly create and auto-toggle global garks
Marks, while extremely useful, are a bit cumbersome to use. Do you ever forget which marks map to which places, accidentally try to use a local mark globally, create too many marks and lose track of them, or find that the syntax is too cumbersome for quickly switching between two marks?

This script streamlines the most common use case for marks, making your workflow more efficient:
```vim
nnoremap mm mM:echo "GLOBAL MARK 1 SET"<CR>
nnoremap mM mK:echo "GLOBAL MARK 2 SET"<CR>
nnoremap <Leader>m 'M:call ToggleSmartMarkA()<CR>
let g:smart_mark_global = 1
function! ToggleSmartMarkA()
  if g:smart_mark_global > 0
    nnoremap <Leader>m 'K:call ToggleSmartMarkA()<CR>
    echo "GLOBAL MARK 1"
  else
    nnoremap <Leader>m 'M:call ToggleSmartMarkA()<CR>
    echo "GLOBAL MARK 2"
  endif
  let g:smart_mark_global = -g:smart_mark_global
endfunction
```
How do you use it? First, "mm" sets global mark 1, and "mM" sets global mark 2. This simplifies the process of creating global marks and makes it intuitive to remember which one is which. Now for the fun part. Once you've set the two marks, ```<Leader>m``` will **toggle** between them. If you have your spacebar set as your leader key, this is an extremely fast command to press. Better yet, this eliminates the need for you to remember which mark is which. You can simply move to the "other" one.


### Quickly nudge lines up and down
This is super fun to use. I call it "nudging". Make a selection in visual mode, and nudge it up or down 1 line using J or K.
```vim
vnoremap J :m '>+1<CR>gv=gv
vnoremap K :m '<-2<CR>gv=gv
```

### Maps for editing HTML files
Firstly, I use a plugin called [Emmet](https://github.com/mattn/emmet-vim) to help edit html files. It's extremely useful.
Additionally, here are some maps to add to your ```ftplugin/html.vim```file, to execute when html files are opened.

Here's a function to fill a page with a basic HTML template:
```vim
fun! InsertTemplate()
  exe "normal! G"
  let l:line = line('.')
  call setline(l:line+1, "<!DOCTYPE html>")
  call setline(l:line+2, '<html lang="en-US">')
  call setline(l:line+3, "  <head>")
  call setline(l:line+4, '    <link rel="stylesheet" href="">')
  call setline(l:line+5, '    <script src=""></script>')
  call setline(l:line+6, '    <meta charset="utf-8">')
  call setline(l:line+7, "  </head>")
  call setline(l:line+8, "  <body>")
  call setline(l:line+9, "    ")
  call setline(l:line+10, "  </body>")
  call setline(l:line+11, "</html>")
endfun
" Now, create a current-buffer-only map that gives you a shortcut to call this function.
nnoremap <buffer> <silent> <Leader>,, :call InsertTemplate()<CR>
```

When you're using a lot of ```<i>```, ```<em>```, ```<b>```, etc., you'll find it can be very cumbersome to remove these modifiers by hand since you have two parts to delete. Here's another html map that makes this process much faster:
```vim
autocmd FileType html nnoremap <Leader>,d2 i`<Esc>lvf>d<Esc>hf<vf>d<Esc>F`x
```

Use the command above while your cursor is hovering over the first angle bracket of the ```<em>``` element in the following text...
```html
<p>Here is some <em>emphasized</em> text in html.</p>
```
The result will look like:
```html
<p>Here is some emphasized text in html.</p>
```
Sweet! That was fast.

<hr>

<a name="markdown"></a>
<br><br>
# Github Markdown - Interactive Tutorial
[<img src="Buttons/SVG/see the tutorial.svg" height="34"/>](markdown-tutorial.md)
<hr>

Amazing documentation [like this](https://spacy.io/usage/linguistic-features/) is hard to come by. Github has some sweet features you can take advantage of in your readme pages with very little effort. For example, you can even fold text like this:

<details>
  <summary><i><b>CLICK ME!</b></i></summary>

- I am an inside of an html ```details``` element. See the tutorial above for how to use me!

```python
print("I'm colored with python syntax highlighting, AND I'm encased inside a text folding element :)")
```
</details>

<br><hr><br>

<a name="bottom"></a>
[<img src="Buttons/SVG/top of page.svg" height="35" width="auto"/>](#top)

