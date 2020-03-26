package com.mettresmart;

import android.content.Context;
import android.util.Log;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import javax.annotation.Nonnull;

import br.com.daruma.framework.mobile.DarumaMobile;

public class DmfJavaModule extends ReactContextBaseJavaModule {
    private DarumaMobile dmf = null;
    private Context context = null;

    private Context getContext() {
        return this.context;
    }

    private void setContext(Context context) {
        this.context = context;
    }

    private void getInstanciaDmf(String PrinterName) {
        try {
            if (dmf == null) {
                dmf = DarumaMobile.inicializar(getContext(),
                        "@FRAMEWORK(LOGMEMORIA=500;TRATAEXCECAO=TRUE);" +
                                //"@SOCKET(HOST=127.0.0.1;PORT=50000;)");
                                // "@BLUETOOTH(NAME=Printer_C9EA;TIMEOUT=10000;)");
                                "@BLUETOOTH(NAME=" + PrinterName + ";TIMEOUT=10000;)");
                            }
        } catch (Exception e) {
            Log.e(this.getName(), "Erro ao recuperar instância: " + e.getMessage());
        }
    }

    @ReactMethod
    public void imprimirTextoDmf(String texto, String PrinterName) {
        try {
            getInstanciaDmf(PrinterName);

            Thread t = new Thread(() -> {
                dmf.iImprimirTexto_DUAL(texto);
            });
            t.start();
            t.join();

        } catch (Exception e) {
            Log.e(this.getName(), "Erro ao imprimir texto: " + e.getMessage());
        }
    }

    @ReactMethod
    public void emissaoCupomDmf(int qtdItens, String PrinterName) {
        try {
            getInstanciaDmf(PrinterName);

            Thread t = new Thread(() -> {
                dmf.aCFAbrir_NFCe("", "", "", "",
                        "", "", "", "", "");

                for (int i = 0; i < qtdItens; i++) {
                    dmf.aCFConfImposto_NFCe("ICMS00", "0;00;3;;12.00;;;");
                    dmf.aCFConfImposto_NFCe("PISNT", "04;");
                    dmf.aCFConfImposto_NFCe("COFINSNT", "04;");

                    dmf.aCFVenderCompleto_NFCe(
                            "12.00", "1.00", "15.00",
                            "D$", "0.00", "12345",
                            "39231090", "5102", "UNI",
                            "Item teste " + i, "CEST=1234567;cEAN=SEM GTIN;cEANTrib=SEM GTIN;");
                }

                dmf.aCFTotalizar_NFCe("D$", "0.00");

                dmf.aCFEfetuarPagamento_NFCe("Dinheiro", "50.00");

                dmf.tCFEncerrar_NFCe("Obrigado, volte sempre!");
            });
            t.start();
            t.join();

        } catch (Exception e) {
            Log.e(this.getName(), "Erro ao emitir cupom: " + e.getMessage());
        }
    }

    public DmfJavaModule(@Nonnull ReactApplicationContext reactContext) {
        super(reactContext);
        setContext(reactContext.getBaseContext());
    }

    @Nonnull
    @Override
    public String getName() {
        return "DarumaMobile";
    }
}
