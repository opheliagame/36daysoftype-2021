import os

from fontTools.designspaceLib import DesignSpaceDocument, AxisDescriptor, SourceDescriptor, InstanceDescriptor

root = os.getcwd()
doc = DesignSpaceDocument()

familyName = "PaperFont"

#------
# axes
#------

a1 = AxisDescriptor()
a1.maximum = 1000
a1.minimum = 0
a1.default = 0
a1.name = "weight"
a1.tag = "wght"
doc.addAxis(a1)

#---------
# masters
#---------

s0 = SourceDescriptor()
s0.path = "PaperOn.ufo"
s0.name = "master.PaperFont.PaperOn.0"
s0.familyName = familyName
s0.styleName = "Light"
s0.location = dict(weight=0, width=0)
s0.copyLib = True
s0.copyInfo = True
s0.copyGroups = True
s0.copyFeatures = True
doc.addSource(s0)

s1 = SourceDescriptor()
s1.path = "PaperOff.ufo"
s0.name = "master.PaperFont.PaperOff.0"
s1.familyName = familyName
s1.styleName = "Bold"
s1.location = dict(weight=1000, width=0)
doc.addSource(s1)

#--------
# saving
#--------

path = os.path.join(root, "PaperFont.designspace")
doc.write(path)
