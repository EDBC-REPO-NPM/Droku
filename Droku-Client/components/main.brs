function onKeyEvent(key as String, press as Boolean) as Boolean  
    if press = false or m.top.element = invalid then return false  

    element = m.top.element
    print key

    if element.events <> invalid and element.events[key] <> invalid
        event = element.events[key]
        if event["focus"] <> invalid
            element = m.top.findNode(event["focus"])
            element.setFocus(true)
        end if
    end if 

    return true
end function

''-------------------------------------------------------------------------------------------''

