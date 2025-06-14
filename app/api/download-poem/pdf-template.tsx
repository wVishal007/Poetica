import type React from "react"
import { Document, Page, Text, View, StyleSheet, Font } from "@react-pdf/renderer"

// Register custom fonts for better typography
Font.register({
  family: "Playfair",
  fonts: [
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDXbtXK-F2qO0isEw.woff2",
      fontWeight: "normal",
    },
    {
      src: "https://fonts.gstatic.com/s/playfairdisplay/v30/nuFvD-vYSZviVYUb_rj3ij__anPXJzDwcbmjWBN2PKdFvXDYbtXK-F2qO0isEw.woff2",
      fontWeight: "bold",
    },
  ],
})

Font.register({
  family: "Crimson",
  src: "https://fonts.gstatic.com/s/crimsontext/v19/wlp2gwHKFkZgtmSR3NB0oRJvaAJSA_JN3Q.woff2",
})

// PDF Styles
const styles = StyleSheet.create({
  // Classic Template Styles
  classicPage: {
    flexDirection: "column",
    backgroundColor: "#fdf2f8",
    padding: 40,
    fontFamily: "Playfair",
  },
  classicContainer: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 40,
    border: "3px solid #f9a8d4",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  classicHeader: {
    alignItems: "center",
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: "2px solid #f9a8d4",
  },
  classicLogo: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ec4899",
    marginBottom: 8,
  },
  classicSubtitle: {
    fontSize: 12,
    color: "#ec4899",
    fontStyle: "italic",
  },
  classicTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#be185d",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Playfair",
  },
  classicPoem: {
    fontSize: 16,
    lineHeight: 1.8,
    color: "#9f1239",
    textAlign: "center",
    fontFamily: "Crimson",
    fontStyle: "italic",
    marginBottom: 40,
  },
  classicFooter: {
    textAlign: "center",
    paddingTop: 20,
    borderTop: "1px solid #f9a8d4",
    color: "#ec4899",
    fontSize: 10,
  },

  // Vintage Template Styles
  vintagePage: {
    flexDirection: "column",
    backgroundColor: "#fef7ed",
    padding: 50,
    fontFamily: "Playfair",
  },
  vintageContainer: {
    flex: 1,
    backgroundColor: "#fffbf0",
    padding: 50,
    border: "5px double #d97706",
    position: "relative",
  },
  vintageCorner: {
    position: "absolute",
    width: 30,
    height: 30,
    border: "2px solid #d97706",
  },
  vintageCornerTL: {
    top: 10,
    left: 10,
    borderRight: "none",
    borderBottom: "none",
  },
  vintageCornerTR: {
    top: 10,
    right: 10,
    borderLeft: "none",
    borderBottom: "none",
  },
  vintageCornerBL: {
    bottom: 10,
    left: 10,
    borderRight: "none",
    borderTop: "none",
  },
  vintageCornerBR: {
    bottom: 10,
    right: 10,
    borderLeft: "none",
    borderTop: "none",
  },
  vintageTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#92400e",
    textAlign: "center",
    marginBottom: 40,
    textDecoration: "underline",
  },
  vintagePoem: {
    fontSize: 14,
    lineHeight: 2,
    color: "#78350f",
    textAlign: "center",
    fontFamily: "Crimson",
    marginBottom: 50,
  },
  vintageFooter: {
    textAlign: "center",
    color: "#d97706",
    fontSize: 12,
    fontStyle: "italic",
  },

  // Modern Template Styles
  modernPage: {
    flexDirection: "column",
    backgroundColor: "#f8fafc",
    padding: 30,
    fontFamily: "Playfair",
  },
  modernContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 60,
    borderRadius: 20,
    boxShadow: "0 25px 50px rgba(0,0,0,0.1)",
  },
  modernHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 50,
    paddingBottom: 20,
    borderBottom: "1px solid #e2e8f0",
  },
  modernLogo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#e11d48",
  },
  modernDate: {
    fontSize: 10,
    color: "#64748b",
  },
  modernTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#1e293b",
    textAlign: "center",
    marginBottom: 40,
    letterSpacing: 1,
  },
  modernPoem: {
    fontSize: 18,
    lineHeight: 1.6,
    color: "#334155",
    textAlign: "center",
    fontFamily: "Crimson",
    marginBottom: 60,
  },
  modernFooter: {
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 10,
    borderTop: "1px solid #e2e8f0",
    paddingTop: 20,
  },

  // Floral Template Styles
  floralPage: {
    flexDirection: "column",
    backgroundColor: "#fefce8",
    padding: 40,
    fontFamily: "Playfair",
  },
  floralContainer: {
    flex: 1,
    backgroundColor: "white",
    padding: 50,
    border: "3px solid #facc15",
    borderRadius: 25,
    position: "relative",
  },
  floralBorder: {
    position: "absolute",
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    border: "1px solid #eab308",
    borderRadius: 20,
  },
  floralTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#a16207",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  floralDivider: {
    textAlign: "center",
    fontSize: 20,
    color: "#facc15",
    marginBottom: 30,
  },
  floralPoem: {
    fontSize: 16,
    lineHeight: 1.9,
    color: "#78350f",
    textAlign: "center",
    fontFamily: "Crimson",
    fontStyle: "italic",
    marginBottom: 30,
  },
  floralFooter: {
    textAlign: "center",
    color: "#a16207",
    fontSize: 11,
    fontStyle: "italic",
    marginTop: 20,
  },
})

interface PoemPDFProps {
  title: string
  poem: string
  template: "classic" | "vintage" | "modern" | "floral"
}

const PoemPDF: React.FC<PoemPDFProps> = ({ title, poem, template }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const renderClassicTemplate = () => (
    <Page size="A4" style={styles.classicPage}>
      <View style={styles.classicContainer}>
        <View style={styles.classicHeader}>
          <Text style={styles.classicLogo}>💕 Poetica</Text>
          <Text style={styles.classicSubtitle}>Express your emotions in verses of love</Text>
        </View>

        <Text style={styles.classicTitle}>{title}</Text>

        <Text style={styles.classicPoem}>{poem}</Text>

        <View style={styles.classicFooter}>
          <Text>Created with love by Poetica</Text>
          <Text>{currentDate}</Text>
        </View>
      </View>
    </Page>
  )

  const renderVintageTemplate = () => (
    <Page size="A4" style={styles.vintagePage}>
      <View style={styles.vintageContainer}>
        <View style={[styles.vintageCorner, styles.vintageCornerTL]} />
        <View style={[styles.vintageCorner, styles.vintageCornerTR]} />
        <View style={[styles.vintageCorner, styles.vintageCornerBL]} />
        <View style={[styles.vintageCorner, styles.vintageCornerBR]} />

        <Text style={styles.vintageTitle}>{title}</Text>

        <Text style={styles.vintagePoem}>{poem}</Text>

        <View style={styles.vintageFooter}>
          <Text>~ A timeless verse from Poetica ~</Text>
          <Text>{currentDate}</Text>
        </View>
      </View>
    </Page>
  )

  const renderModernTemplate = () => (
    <Page size="A4" style={styles.modernPage}>
      <View style={styles.modernContainer}>
        <View style={styles.modernHeader}>
          <Text style={styles.modernLogo}>POETICA</Text>
          <Text style={styles.modernDate}>{currentDate}</Text>
        </View>

        <Text style={styles.modernTitle}>{title}</Text>

        <Text style={styles.modernPoem}>{poem}</Text>

        <View style={styles.modernFooter}>
          <Text>Crafted with artificial intelligence and human emotion</Text>
        </View>
      </View>
    </Page>
  )

  const renderFloralTemplate = () => (
    <Page size="A4" style={styles.floralPage}>
      <View style={styles.floralContainer}>
        <View style={styles.floralBorder} />

        <Text style={styles.floralTitle}>{title}</Text>
        <Text style={styles.floralDivider}>❀ ❀ ❀</Text>

        <Text style={styles.floralPoem}>{poem}</Text>

        <Text style={styles.floralDivider}>❀ ❀ ❀</Text>
        <View style={styles.floralFooter}>
          <Text>Blooming with love from Poetica</Text>
          <Text>{currentDate}</Text>
        </View>
      </View>
    </Page>
  )

  const renderTemplate = () => {
    switch (template) {
      case "vintage":
        return renderVintageTemplate()
      case "modern":
        return renderModernTemplate()
      case "floral":
        return renderFloralTemplate()
      default:
        return renderClassicTemplate()
    }
  }

  return <Document>{renderTemplate()}</Document>
}

export default PoemPDF
