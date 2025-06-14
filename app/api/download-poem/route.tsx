import { type NextRequest, NextResponse } from "next/server"
import { renderToBuffer } from "@react-pdf/renderer"
import { PoemPDF } from "./pdf-template"

export async function POST(request: NextRequest) {
  try {
    const { title, poem, template = "classic" } = await request.json()

    // Generate PDF buffer using React-PDF
    const pdfBuffer = await renderToBuffer(<PoemPDF title={title} poem={poem} template={template} />)

    // Return PDF as downloadable file
    return new NextResponse(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${title.replace(/\s+/g, "-")}.pdf"`,
        "Content-Length": pdfBuffer.length.toString(),
      },
    })
  } catch (error) {
    console.error("Error generating PDF:", error)
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 })
  }
}
