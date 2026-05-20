import SwiftUI
import WebKit

// ─── Main view ────────────────────────────────────────────────
struct ContentView: View {
    var body: some View {
        MochiWebView()
            .ignoresSafeArea()   // the web app handles safe-area itself
    }
}

// ─── WKWebView wrapper ────────────────────────────────────────
struct MochiWebView: UIViewRepresentable {

    func makeCoordinator() -> Coordinator { Coordinator() }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        config.allowsInlineMediaPlayback = true
        config.mediaTypesRequiringUserActionForPlayback = []

        let webView = WKWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = context.coordinator
        webView.scrollView.bounces = false
        webView.scrollView.contentInsetAdjustmentBehavior = .never
        webView.isOpaque = true
        webView.backgroundColor = UIColor(red: 0.969, green: 0.949, blue: 0.898, alpha: 1)

        // Load the bundled index.html
        if let url = Bundle.main.url(forResource: "index", withExtension: "html") {
            webView.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        }
        return webView
    }

    func updateUIView(_ webView: WKWebView, context: Context) {}

    // ─── Coordinator: handle navigation errors gracefully ───────
    class Coordinator: NSObject, WKNavigationDelegate {
        func webView(_ webView: WKWebView,
                     didFail navigation: WKNavigation!,
                     withError error: Error) {
            print("WebView navigation error: \(error.localizedDescription)")
        }
    }
}

// ─── Preview ──────────────────────────────────────────────────
#Preview {
    ContentView()
}
