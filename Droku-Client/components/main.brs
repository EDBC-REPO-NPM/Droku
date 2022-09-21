function onKeyEvent(key as String, pressed as Boolean) as Boolean
    if pressed <> true then return false

    print key

    element = m.top.focusedChild
    
    while true
        element = element.focusedChild
        if element.focusable = true then exit while
    end while

    try
        index = element.itemFocused
        content = element.content.getChild(index)
        m.events = content.events[key]
    catch e
        index = element.itemFocused
        m.events = element.events[key]
    end try

    if m.events <> invalid
        for each event in m.events
            
            if event.type = "set"
                setEvent( event )
            else if event.type = "add"
                addEvent( event )
            end if 
            
        end for
    end if

    return true
end function

''-------------------------------------------------------------------------------------------''

function setEvent( Node as Object ) as Void
    if type(Node) = "roAssociativeArray"

        element = m.top.findNode( Node["id"] )

        if Node["focus"] = true
            element.setFocus(true)
        end if
    
        if Node["fields"] <> invalid
            element.setFields( Node["fields"] )
        end if

        if Node["children"] <> invalid
            
        end if

    end if
end function