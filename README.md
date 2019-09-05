# mofron-comp-prjtop
[mofron](https://mofron.github.io/mofron/) is module based frontend framework.

project component for mofron

it makes easy to build project top contents


# Install
```
npm install mofron mofron-comp-prjtop
```

# Sample
```html
<require>
    <tag module="mofron-comp-appbase">AppBase</tag>
    <tag module="mofron-comp-prjtop">PrjTop</tag>
</require>

<AppBase>
    <PrjTop text="Project Top Page">
        <button>Get Started,"./"</button>
    </PrjTop>
</AppBase>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | image | string | path to image |
| | | string (size) | blur size |
| ◯  | text | string | phrase text |
| | button | mixed | mofron-comp-button: link component |
| | | | string: button text |
| | | string | link path |
| | offset | string (size) | offset size |

