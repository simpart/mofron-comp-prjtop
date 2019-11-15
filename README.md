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
    <tag load="mofron-comp-appbase">AppBase</tag>
    <tag load="mofron-comp-prjtop">PrjTop</tag>
</require>

<AppBase>
    <PrjTop text="Project Top Page">
        <button url="./">Get Started</button>
    </PrjTop>
</AppBase>
```
# Parameter

|Simple<br>Param | Parameter Name | Type | Description |
|:--------------:|:---------------|:-----|:------------|
| | image | mixed | string: path to image |
| | | | mofron-comp-image: replace image component |
| | | associative array | options image component |
| ◯  | text | mixed | string: phrase text |
| | | | mofron-comp-text: replace text component |
| | | associative array | options for text component |
| | button | mixed | mofron-comp-button: replace button component |
| | | | string: button text |
| | | associative array | options for buttom component |
| | | | url: set jump url (default is './') |
| | offset | string (size) | offset size |

