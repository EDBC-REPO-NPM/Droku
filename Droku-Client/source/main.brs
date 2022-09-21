
sub Main() : mainScreen() : End sub


''-------------------------------------------------------------------------------------------''

sub mainScreen()

    m.server = "http://192.168.101.8:3000/index"

    '' creating screen ''
    m.port = CreateObject("roMessagePort")
    screen = CreateObject("roSGScreen")
    screen.setMessagePort(m.port)

    '' creating scene ''
    m.scene = screen.CreateScene("main")
    screen.show() : m.scene.setFocus(true)
    m.scene.observeField("focusedChild", m.port)
    m.scene.ObserveField("selectedListItem", m.port)

    '' loading content from webServer ''
    fetch({url:m.server})
    ScreenEventHandler()
    
End sub

''-------------------------------------------------------------------------------------------''

function placeNode( Parent as Object, Node as Object ) as Void
    if type(Node) = "roAssociativeArray"

        element = CreateObject("roSGNode",Node["type"])

        if Node["focus"] = true
            element.setFocus(true)
        end if

        if element.setMessagePort <> invalid
            element.setMessagePort(m.port)
        end if

        if Node["events"] <> invalid
            element.addFields({
                events: Node["events"]
            })
        end if

        if Node["children"] <> invalid
            for each item in Node["children"]
                placeNode( element,item )
            end for 
        end if
    
        if Node["fields"] <> invalid
            element.setFields( Node["fields"] )
        end if

        Parent.appendChild( element )
        Parent.content = element

    end if
end function

function loadScreen(code as integer, response as string) as Void
    
    body = ParseJson( response )
   
    if body.scene <> invalid
        m.scene.setFields( body.scene )
    end if 

    if body.children <> invalid
        for each item in body.children
            placeNode(m.scene,item)
        end for
    end if

end function 

''-------------------------------------------------------------------------------------------''

Function fetch( params as Object ) as Boolean

    if params = invalid then return invalid
    request = CreateObject("roUrlTransfer")
    request.setMessagePort(m.port)
    
    if left(params.url,5) = "https"
        request.SetCertificatesFile("common:/certs/ca-bundle.crt")
        request.AddHeader("X-Roku-Reserved-Dev-Id", "")
        request.InitClientCertificates()
    End if : request.SetUrl(params.url)

    if params.method <> invalid 
        request.SetRequest(params.method) 
    else 
        request.SetRequest("GET")
    end if 

    if params.headers <> invalid
        for each item in params.headers
            request.AddHeader(item,params.headers[item])
        end for
    end if 

    if params.body <> invalid and request.AsyncPostFromString(params.body)
        UrlEventHandler() : return true
    else if request.AsyncGetToString() 
        UrlEventHandler() : return true
    end if

    return false
End Function 

''-------------------------------------------------------------------------------------------''

function ElementEventHandler( Node as Object ) as Void
    print "New Element focused"
end function

''-------------------------------------------------------------------------------------------''

function ScreenEventHandler() as Void
    while true : msg=wait(0,m.port) 
        if type(msg) = "roSGNodeEvent"
            ElementEventHandler(msg.getData())
        else if type(msg) = "roSGScreenEvent"
            if msg.isScreenClosed() then CloseEvent()
        end if
    End while
end function

function UrlEventHandler() as Void
    while true : msg = wait(0, m.port)
        if type(msg) = "roUrlEvent"
            code = msg.GetResponseCode()
            response = msg.GetString()
            loadScreen(code,response)
            exit while
        end if
    end while
end function 
